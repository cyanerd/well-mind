import Fullscreen from '../../layouts/Fullscreen';
import Button from '../Button';
import classNames from 'classnames/bind';
import {useSelector, useDispatch} from 'react-redux';
import {setMode, nextStep, previousStep, setCurrentAnswer, setAnswer, getters} from '../../redux/test';
import {useEffect} from 'react';
import api from '../../Api';

export default function TestStep() {
  const dispatch = useDispatch();
  const questions = useSelector(state => state.test.questions);
  const step = useSelector(state => state.test.step);
  const answers = useSelector(state => state.test.answers);
  const currentAnswer = useSelector(state => state.test.currentAnswer);
  const question = useSelector(getters.currentQuestion);
  useEffect(() => {
    dispatch(setCurrentAnswer(null));
  }, [dispatch, step]);
  const options = [
    {value: 1, title: 'совершенно не обо мне'},
    {value: 2, title: 'в основном неверно'},
    {value: 3, title: 'скорее верно, чем неверно'},
    {value: 4, title: 'в основном верно'},
    {value: 5, title: 'идеально описывает меня'}
  ];
  const finish = async () => {
    const res = Object.values(answers).reduce((acc, answer) => {
      if (!acc[answer.section]) acc[answer.section] = 0;
      acc[answer.section] += answer.value;
      return acc;
    }, {});
    const sectionId = Object.keys(res).reduce((a, b) => res[a] > res[b] ? a : b);
    const schemeId = parseFloat(sectionId) + 135; // потому что элементы в инфоблоке начинаются с ID 136 и идут по порядку
    await api.request('set_schema', {id: schemeId});
  }
  return (
    <Fullscreen layout={{
      closeButton: true,
      class: 'fullscreen-single-background',
      closeHandler: () => dispatch(setMode('intro'))
    }}>
      {/*step: {step}<br/>*/}
      {/*answers: {JSON.stringify(answers)}<br/>*/}
      {/*questions: {JSON.stringify(questions)}<br/>*/}
      {/*currentAnswer: {JSON.stringify(currentAnswer)}*/}
      <div className="inner-page">
        <div className="fullscreen section">
          <div className="question-title">{question.question}</div>
          <div className="test-container">
            <div className="answers-list">
              {options.map(({value, title}) =>
                <Button
                  key={value}
                  onClick={() => {
                    dispatch(setCurrentAnswer(value));
                    dispatch(setAnswer(value));
                  }}
                  className={classNames({
                    'btn-fullwidth': true,
                    'btn-outline': true,
                    active: value === currentAnswer
                  })}
                >
                  {title}
                </Button>
              )}
            </div>
            <div className="test-bottom-section">
              <div className="step-counter">Вопрос {step} из {questions.length}</div>
              <div className="test-buttons">
                {/* Назад */}
                <Button disabled={step === 1} onClick={() => dispatch(previousStep())} className="btn-outline">Назад</Button>
                {/* Далее */}
                {questions.length > step &&
                <Button disabled={!currentAnswer} className="btn-blue" onClick={() => dispatch(nextStep())}>Далее</Button>}
                {/* Закончить */}
                {questions.length === step &&
                <Button disabled={!currentAnswer} className="btn-blue" onClick={async () => {
                  await finish();
                  dispatch(setMode('finish'));
                }}>Закончить</Button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fullscreen>
  )
}