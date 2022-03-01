import Fullscreen from '../../layouts/Fullscreen';
import Button from '../Button';
import classNames from 'classnames/bind';
import {useSelector, useDispatch} from 'react-redux';
import {setMode, nextStep, previousStep, setCurrentAnswer, setAnswer, getters, setScheme} from '../../redux/test';
import React, {useEffect} from 'react';
import api from '../../Api';
import {RootState} from '../../redux/store';

const TestStep: React.FC = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state: RootState) => state.test.questions);
  const step = useSelector((state: RootState) => state.test.step);
  const answers = useSelector((state: RootState) => state.test.answers);
  const currentAnswer = useSelector((state: RootState) => state.test.currentAnswer);
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
    let valueSum = 0;
    const res: any = Object.values(answers).reduce((acc: any, answer: any) => {
      valueSum += answer.value;
      if (!acc[answer.section]) acc[answer.section] = 0;
      acc[answer.section] += answer.value;
      return acc;
    }, {});
    let schemeId = 0;
    // если количество набранных баллов равно количество ответов (т.е. если на все вопросы был дан ответ "совершенно не обо мне"),
    // то ставим схему "Баланс" (id 147)
    if (valueSum === Object.keys(answers).length) {
      schemeId = 147;
    } else {
      const sectionId = Object.keys(res).reduce((a, b) => res[a] > res[b] ? a : b);
      schemeId = parseFloat(sectionId) + 135; // потому что элементы в инфоблоке начинаются с ID 136 и идут по порядку
    }
    await api.request('set_schema', {id: schemeId});
    dispatch(setScheme(schemeId));
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
      <div className="inner-page test-step-inner-page">
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

export default TestStep;