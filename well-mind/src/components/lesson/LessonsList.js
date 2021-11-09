import LessonCard from './LessonCard';
import Button from '../Button';
import {useState} from 'react';
import Slider from 'react-slick';
import {sliderSettings} from '../../helper';

export default function LessonsList() {
  const lessons = [
    {
      id: 1,
      day: 1,
      goal: 'Расслабиться, успокоиться',
      status: 'completed'
    },
    {
      id: 2,
      day: 2,
      goal: 'Самопомощь, разложить по полочкам, найти решение',
      status: 'general'
    },
    {
      id: 3,
      day: 3,
      goal: 'Самопомощь, разложить по полочкам, найти решение Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur massa nisi, convallis et varius vitae, congue id risus',
      status: 'disabled'
    },
    {
      id: 4,
      day: 4,
      goal: 'Самопомощь, разложить по полочкам, найти решение Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur massa nisi, convallis et varius vitae, congue id risus',
      status: 'disabled'
    },
    {
      id: 5,
      day: 5,
      goal: 'Самопомощь, разложить по полочкам, найти решение Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur massa nisi, convallis et varius vitae, congue id risus',
      status: 'disabled'
    },
    {
      id: 6,
      day: 6,
      goal: 'Самопомощь, разложить по полочкам, найти решение Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur massa nisi, convallis et varius vitae, congue id risus',
      status: 'disabled'
    },
    {
      id: 7,
      day: 7,
      goal: 'Самопомощь, разложить по полочкам, найти решение Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur massa nisi, convallis et varius vitae, congue id risus',
      status: 'disabled'
    },
    {
      id: 8,
      day: 8,
      goal: 'Самопомощь, разложить по полочкам, найти решение Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur massa nisi, convallis et varius vitae, congue id risus',
      status: 'disabled'
    },
    {
      id: 9,
      day: 9,
      goal: 'Самопомощь, разложить по полочкам, найти решение Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur massa nisi, convallis et varius vitae, congue id risus',
      status: 'disabled'
    },
    {
      id: 10,
      day: 10,
      goal: 'Самопомощь, разложить по полочкам, найти решение Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur massa nisi, convallis et varius vitae, congue id risus',
      status: 'disabled'
    },
    {
      id: 11,
      day: 11,
      goal: 'Самопомощь, разложить по полочкам, найти решение Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur massa nisi, convallis et varius vitae, congue id risus',
      status: 'disabled'
    },
    {
      id: 12,
      day: 12,
      goal: 'Самопомощь, разложить по полочкам, найти решение Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur massa nisi, convallis et varius vitae, congue id risus',
      status: 'disabled'
    },
    {
      id: 13,
      day: 13,
      goal: 'Самопомощь, разложить по полочкам, найти решение Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur massa nisi, convallis et varius vitae, congue id risus',
      status: 'disabled'
    }
  ];
  const perRow = 5;
  const [visibleLessons, setVisibleLessons] = useState(lessons.slice(0, perRow));
  return (
    <>
      <Slider {...sliderSettings} className="lessons-list">
        {visibleLessons.map(lesson => <LessonCard key={lesson.id} lesson={lesson}/>)}
      </Slider>
      {visibleLessons.length !== lessons.length &&
      <div className="centered-btn-container hide-mobile">
        <Button click={() => {
          setVisibleLessons(lessons.slice(0, visibleLessons.length + perRow));
        }} style={{maxWidth: '400px', display: 'block', margin: '0 auto'}}>Смотреть еще</Button>
      </div>}
    </>
  )
}