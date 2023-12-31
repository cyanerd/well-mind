import LessonCard from './LessonCard';
import Button from '../Button';
import React, {useEffect, useState} from 'react';
import Slider from 'react-slick';
import {sliderSettings, mobileBreakpoint} from '../../helper';
import api from '../../Api';
import useWindowSize from '../../hooks/useWindowSize';

const LessonsList: React.FC = () => {
  const size = useWindowSize();
  const [lessons, setLessons] = useState([]);
  const {response} = api.useAxios('get_schemas_exercises_list');
  useEffect(() => {
    if (response?.list) setLessons(Object.values(response.list));
  }, [response]);
  const perRow = 5;
  const [visibleLessons, setVisibleLessons] = useState([]);
  useEffect(() => {
    setVisibleLessons(lessons.slice(0, perRow));
  }, [lessons]);
  useEffect(() => {
    if (size.width && size.width <= mobileBreakpoint && visibleLessons.length !== lessons.length) {
      setVisibleLessons(lessons);
    }
  }, [size.width, lessons]);
  return (
    <>
      <Slider {...sliderSettings} className="lessons-list">
        {/* @ts-ignore */}
        {visibleLessons.map(lesson => <LessonCard key={lesson.id} lesson={lesson}/>)}
      </Slider>
      {visibleLessons.length !== lessons.length &&
      <div className="centered-btn-container hide-mobile">
        <Button onClick={() => {
          setVisibleLessons(lessons.slice(0, visibleLessons.length + perRow));
        }} style={{maxWidth: '400px', display: 'block', margin: '0 auto'}}>Смотреть еще</Button>
      </div>}
    </>
  )
}

export default LessonsList;