import React from 'react';
import AccordionItem from './AccordionItem';

export default function Accordion() {
  const items = [
    {
      id: 1,
      title: 'Как я могу получить индивидуальную программу занятий?',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, exercitationem praesentium! Accusamus alias aperiam, assumenda cum deserunt est impedit laudantium magnam neque odio officia quam quas quis, recusandae repellendus ullam.'
    },
    {
      id: 2,
      title: 'Что, если я не согласен с результатами теста?',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, exercitationem praesentium! Accusamus alias aperiam, assumenda cum deserunt est impedit laudantium magnam neque odio officia quam quas quis, recusandae repellendus ullam.'
    },
    {
      id: 3,
      title: 'У меня есть вопросы по предложенной программе или по упражнениям',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, exercitationem praesentium! Accusamus alias aperiam, assumenda cum deserunt est impedit laudantium magnam neque odio officia quam quas quis, recusandae repellendus ullam.'
    }
  ];

  return (
    <div className="spoiler-list">
      {items.map((item, index) => (<AccordionItem key={item.id} title={item.title} text={item.text} isOpened={!index}/>))}
    </div>
  );
}