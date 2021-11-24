import classNames from 'classnames/bind';
import LinesEllipsis from 'react-lines-ellipsis';
import {useHistory} from 'react-router-dom';

export default function LessonCard({lesson}) {
  const history = useHistory();
  const text = 'Цель: ' + lesson.name;
  const handleClick = (e) => {
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