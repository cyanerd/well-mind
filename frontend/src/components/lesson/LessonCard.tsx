import classNames from 'classnames/bind';
import LinesEllipsis from 'react-lines-ellipsis';
import {useHistory} from 'react-router-dom';
import React from 'react';

interface ILessonCardProps {
  lesson: {
    status: boolean,
    name: string,
    current: boolean,
    sort: number,
    id: number,
    preview_text: string
  }
}

const LessonCard: React.FC<ILessonCardProps> = ({lesson}) => {
  const history = useHistory();
  const text = 'Цель: ' + lesson.preview_text.replace(/<\/?[^>]+(>|$)/g, '');
  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!lesson.status && !lesson.current) return false;
    history.push(`/program/${lesson.id}`);
  }
  return (
    <div onClick={handleClick} className={classNames({
      'lesson-card': true,
      'lesson-card-completed': lesson.status,
      'lesson-card-disabled': !lesson.status && !lesson.current
    })}>
      <div className="day-number"><span>{lesson.sort}</span> день</div>
      <div className="goal">
        <LinesEllipsis text={text} maxLine={4}/>
      </div>
      <div className="link-container">
        <a href="/" onClick={handleClick} className="link">Перейти</a>
      </div>
    </div>
  );
}

export default LessonCard;