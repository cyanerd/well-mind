import {ReactComponent as LogoWhite} from '../../images/logo-white.svg';
import {Link} from 'react-router-dom';

export default function Footer() {
  return (
    <div className="footer">
      <div className="section">
        <Link to="/" className="logo">
          <LogoWhite/>
        </Link>
        <div className="footer-right">
          <ul className="nav">
            <li><Link to="/contacts">Контакты</Link></li>
            <li><Link to="/offer">Оферта</Link></li>
            <li><Link to="/policy">Политика конфиденциальности</Link></li>
          </ul>
          <div className="copyright">
            © Любое использование либо копирование материалов сайта, элементов дизайна и оформления допускается лишь с
            письменного разрешения правообладателя и при указании ссылки на первоисточник Well-mind
          </div>
        </div>
      </div>
    </div>
  );
}