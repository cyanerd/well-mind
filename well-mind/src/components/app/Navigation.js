import {Link} from 'react-router-dom';
import classNames from 'classnames/bind';

export default function Navigation({mobileMenuOpened}) {
  return (
    <ul className={classNames({nav: true, opened: mobileMenuOpened})}>
      <li><Link to="/test" className="tour-program">Программа</Link></li>
      <li><a href="/psychologists">Наши психологи</a></li>
      <li><a href="/library">Библиотека</a></li>
    </ul>
  );
}
