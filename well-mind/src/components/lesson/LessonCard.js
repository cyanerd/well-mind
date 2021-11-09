import classNames from 'classnames/bind';
import LinesEllipsis from 'react-lines-ellipsis';

export default function LessonCard({lesson}) {
  const text = 'Цель: ' + lesson.goal;
  return (
    <div className={classNames({
      'lesson-card': true,
      'lesson-card-completed': lesson.status === 'completed',
      'lesson-card-disabled': lesson.status === 'disabled'
    })}>
      <div className="day-number"><span>{lesson.day}</span> день</div>
      <div className="goal">
        <LinesEllipsis text={text} maxLine={4}/>
      </div>
      <div className="link-container">
        <a href="#" className="link">Перейти</a>
      </div>
    </div>
  );
}