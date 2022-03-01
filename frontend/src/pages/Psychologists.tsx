import Default from '../layouts/Default';
import React from 'react';
import PsychologistsList from '../components/psychologists/PsychologistsList';

const Psychologists: React.FC = () => {
  return (
    <Default>
      <div className="inner-page">
        <div className="section text-page">
          <h2>Наши психологи</h2>
          <p> Остались вопросы по результатам теста или выполнению программы? Чувствуете, что вам необходима помощь со стороны? Вы
            можете получить отдельную консультацию или индивидуальные занятия в дополнение к вашей основной программе. Формат
            общения на выбор: очно или онлайн.</p>
          <p>Мы предлагаем вам только дипломированных специалистов с реальным опытом работы, прошедших собеседование с командой
            Well-mind.</p>
          <PsychologistsList/>
        </div>
      </div>
    </Default>
  );
}

export default Psychologists;