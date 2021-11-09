import Button from '../Button';
import Default from '../../layouts/Default';
import {useDispatch} from 'react-redux';
import {startTest} from '../../redux/test'

export default function TestIntro() {
  const dispatch = useDispatch();
  return (
    <Default>
      <div className="inner-page test-intro">
        <div className="section">
          <h2>Определение<br/> психологического портрета </h2>
          <p className="hide-mobile" style={{maxWidth: '950px'}}>Пройдите простой тест, состоящий из 30 вопросов - его выполнение
            займет у вас не более 15
            минут. Исходя из его результатов, мы определим вашу проблему и подберем программу упражнений, подходящую именно
            вам.<br/>
            Отвечайте честно и первое, что приходит вам на ум.</p>
          <p className="hide-mobile" style={{maxWidth: '450px', marginTop: '90px'}}>
            Мы предлагаем вам оценить каждое из следующих утверждений по шкале:
          </p>
          <p className="hide-desktop">Пройдите простой тест - это займет
            у вас не более 15 минут.
            Отвечайте честно и первое,
            что приходит вам на ум.</p>
          <div className="grades">
            <div>совершенно не обо мне</div>
            <div>в основном неверно</div>
            <div>скорее верно</div>
            <div>в основном верно</div>
            <div>идеально описывает меня</div>
          </div>
          <p style={{textAlign: 'center', maxWidth: '590px', margin: '0 auto', padding: '0 20px'}}>
            Отвечайте честно и первое, что приходит вам на ум. Тагда мы сможем наиболее точно определить Ваш психологический
            портрет.
          </p>
          <div className="centered-btn-container">
            <Button click={() => dispatch(startTest())} style={{maxWidth: '330px', width: '100%'}}>Начать тест</Button>
          </div>
        </div>
      </div>
    </Default>
  )
}