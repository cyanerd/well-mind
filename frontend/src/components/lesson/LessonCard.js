import classNames from 'classnames/bind';
import LinesEllipsis from 'react-lines-ellipsis';
import {useHistory} from 'react-router-dom';

export default function LessonCard({lesson}) {
  const history = useHistory();
  const text = 'Цель: ' + lesson.goal;
  const handleClick = (e) => {
    e.preventDefault();
    if (lesson.status === 'disabled') return false;
    history.push(`/program/${lesson.day}`);
  }
  return (
    <div onClick={handleClick} className={classNames({
      'lesson-card': true,
      'lesson-card-completed': lesson.status === 'completed',
      'lesson-card-disabled': lesson.status === 'disabled'
    })}>
      <div className="day-number"><span>{lesson.day}</span> день</div>
      <div className="goal">
        <LinesEllipsis text={text} maxLine={4}/>
      </div>
      <div className="link-container">
        <a href="/" onClick={handleClick} className="link">Перейти</a>
      </div>
    </div>
  );
}