import Button from '../Button';
import Default from '../../layouts/Default';

export default function TestIntro({setStep}) {
  return (
    <Default>
      <div className="inner-page">
        <div className="section">
          <h2>Определение<br/> психологического портрета </h2>
          <p style={{maxWidth: '950px'}}>Пройдите простой тест, состоящий из 30 вопросов - его выполнение займет у вас не более 15
            минут. Исходя из его результатов, мы определим вашу проблему и подберем программу упражнений, подходящую именно
            вам.<br/>
            Отвечайте честно и первое, что приходит вам на ум.</p>
          <p style={{maxWidth: '450px', marginTop: '90px'}}>
            Мы предлагаем вам оценить каждое из следующих утверждений по шкале:
          </p>
          <div className="grades">
            <div>совершенно не обо мне</div>
            <div>в основном неверно</div>
            <div>скорее верно</div>
            <div>в основном верно</div>
            <div>идеально описывает меня</div>
          </div>
          <p style={{textAlign: 'center', maxWidth: '630px', margin: '0 auto'}}>
            Отвечайте честно и первое, что приходит вам на ум. Тагда мы сможем наиболее точно определить Ваш психологический
            портрет.
          </p>
          <div className="centered-btn-container" style={{marginTop: '60px'}}>
            <Button click={() => setStep(1)} style={{maxWidth: '330px', width: '100%'}}>Начать тест</Button>
          </div>
        </div>
      </div>
    </Default>
  )
}