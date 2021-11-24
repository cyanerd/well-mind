import {Link} from 'react-router-dom';
import classNames from 'classnames/bind';
import ProgramLink from './ProgramLink';

export default function Navigation({mobileMenuOpened}) {
  return (
    <ul className={classNames({nav: true, opened: mobileMenuOpened})}>
      <li>
        <ProgramLink linkProp="to" component={
          <Link to="/" className="tour-program">Программа</Link>
        }/>
      </li>
      <li><Link to="/psychologists">Наши психологи</Link></li>
      <li><Link className="tour-library" to="/library">Библиотека</Link></li>
    </ul>
  );
}
