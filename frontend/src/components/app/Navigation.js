import {Link} from 'react-router-dom';
import classNames from 'classnames/bind';

export default function Navigation({mobileMenuOpened}) {
  return (
    <ul className={classNames({nav: true, opened: mobileMenuOpened})}>
      <li><Link to="/test" className="tour-program">Программа</Link></li>
      <li><Link to="/psychologists">Наши психологи</Link></li>
      <li><Link className="tour-library" to="/library">Библиотека</Link></li>
    </ul>
  );
}
