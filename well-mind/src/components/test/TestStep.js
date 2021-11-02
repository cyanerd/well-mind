import Fullscreen from '../../layouts/Fullscreen';
import Button from '../Button';
import {usePersistedState} from '../../helper';
import {useState, useEffect} from 'react';
import classNames from 'classnames/bind';

export default function TestStep(props) {
  const [answers, setAnswers] = usePersistedState('answers');
  const [currentAnswer, setCurrentAnswer] = useState(answers[props.step]);
  const questions = [
    'Я переживаю, что любимые люди уйдут или бросят меня, порой своим переживанием я отталкиваю их',
    'Я креведко',
    'Я томат'
  ];
  const options = [
    {value: 1, title: 'совершенно не обо мне'},
    {value: 2, title: 'в основном неверно'},
    {value: 3, title: 'скорее верно, чем неверно'},
    {value: 4, title: 'в основном верно'},
    {value: 5, title: 'идеально описывает меня'}
  ];
  const answerHandler = (value) => {
    setCurrentAnswer(value);
    setAnswers({...answers, [props.step]: value});
  }
  // при смене вопроса скидывает ответ на null (или из store)
  useEffect(() => setCurrentAnswer(answers[props.step]), [props.step]);
  return (
    <Fullscreen layout={{closeButton: true, class: 'fullscreen-single-background', closeHandler: () => props.setStep(0)}}>
      {JSON.stringify(answers)}<br/>
      step: {props.step}<br/>
      currentAnswer: {currentAnswer}
      <div className="fullscreen section">
        <div className="question-title">{questions[props.step - 1]}</div>
        <div className="test-container">
          <div className="answers-list">
            {options.map(({value, title}) =>
              <Button
                key={value}
                click={() => answerHandler(value)}
                className={classNames({'btn-fullwidth': true, 'btn-outline': true, active: value === currentAnswer})}
              >
                {title}
              </Button>
            )}
          </div>
          <div className="step-counter">Вопрос {props.step} из {questions.length}</div>
          <div className="test-buttons">
            {/* Назад */}
            <Button disabled={props.step === 1} click={() => props.setStep(props.step - 1)} className="btn-outline">Назад</Button>
            {/* Далее */}
            {questions.length > props.step &&
            <Button disabled={!currentAnswer} className="btn-blue" click={() => props.setStep(props.step + 1)}>Далее</Button>}
            {/* Закончить */}
            {questions.length === props.step &&
            <Button disabled={!currentAnswer} className="btn-blue" click={() => props.setStep('finish')}>Закончить</Button>}
          </div>
        </div>
      </div>
    </Fullscreen>
  )
}