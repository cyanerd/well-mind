import {Link} from "react-router-dom";
import Navigation from '../components/app/Navigation';
import Footer from '../components/app/Footer';
import ProfileLink from '../components/ProfileLink';
import {ReactComponent as Logo} from '../images/logo.svg';
import {useState} from 'react';
import classNames from 'classnames/bind';
import eventBus from '../EventBus';

export default function Default({children}) {
  const [mobileMenuOpened, setMobileMenu] = useState(false);
  const mobileMenuClick = (e) => {
    e.preventDefault();
    setMobileMenu(!mobileMenuOpened);
  }
  eventBus.on('TOUR_START', () => {
    setMobileMenu(true);
  });
  eventBus.on('TOUR_COMPLETE', () => {
    setMobileMenu(false);
  });
  return (
    <>
      <header>
        <div className="section">
          <a href="/" className={classNames({'mobile-menu': true, opened: mobileMenuOpened})} onClick={mobileMenuClick}>&nbsp;</a>
          <Link to="/" className="logo">
            <Logo/>
          </Link>
          <Navigation mobileMenuOpened={mobileMenuOpened}/>
          <ProfileLink/>
        </div>
      </header>
      <main className="site-content">
        {children}
      </main>
      <Footer/>
    </>
  )
}