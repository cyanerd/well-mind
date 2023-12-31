import React from 'react';
import AccordionItem from './AccordionItem';

const Accordion: React.FC = () => {
  const items = [
    {
      id: 1,
      title: 'Как я могу получить индивидуальную программу занятий?',
      text: 'Для получения программы работы над вашей проблемой, вам необходимо пройти тест, составленный профессиональным психологом. На основе результатов данного теста мы сможем подобрать для вас индивидуальный набор простых упражнений, выполнение которых позволит помочь вам шаг за шагом идти к решению проблемы в любое время и удобном месте.'
    },
    {
      id: 2,
      title: 'Что, если я не согласен с результатами теста?',
      text: 'Наш тест разработан профессиональным психологом и нацелен на выявление ваших внутренних аспектов, мешающих вам жить в гармонии с самим собой. Прежде, чем отрицать результаты теста, попробуйте все же следовать предложенной вам программе упражнений - мы уверены, что вы почувствуете результат.\n' +
        'Также вы можете обсудить вашу проблему и результаты теста на консультации с одним из наших специалистов, чтобы психолог мог провести более глубокий анализ вашего состояния и помог достичь душевного равновесия.'
    },
    {
      id: 3,
      title: 'У меня есть вопросы по предложенной программе или по упражнениям в ней, что мне делать?',
      text: 'Наша программа предусматривает обратную связь с психологом, ведь наша цель - помочь вам достигнуть желаемого результата. Вы можете в любой момент задать интересующий вас вопрос нашему специалисту, и он с радостью ответит вам в течение суток после получения вопроса.'
    },
    {
      id: 4,
      title: 'Как долго длится программа?',
      text: 'Наша программа разработана таким образом, что вы можете следовать ей столь долго, насколько считаете нужным. Вы можете прекратить следовать подобранной вам программе, как только почувствуете, что справились с вашей проблемой. Вы также сможете в любой момент заново пройти тест на определение, с чем вам стоит поработать в дальнейшем, и получить обновленную программу.'
    },
    {
      id: 5,
      title: 'Какова стоимость ваших услуг?',
      text: 'Прохождение теста на подбор индивидуальной программы является абсолютно бесплатным. Следование подобранной схеме упражнений будет бесплатным в течение первых трех дней, а далее стоимость составит 15 рублей в сутки.\n' +
        'Также вы сможете приобрести индивидуальную консультацию с нашими психологами по стоимости 5000 рублей за один час занятия.'
    }
  ];

  return (
    <div className="spoiler-list">
      {items.map((item) => (<AccordionItem key={item.id} title={item.title} text={item.text} isOpened={false}/>))}
    </div>
  );
}

export default Accordion;