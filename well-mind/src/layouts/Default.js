import {Link} from "react-router-dom";
import Navigation from '../components/app/Navigation';
import Footer from '../components/app/Footer';
import ProfileLink from '../components/ProfileLink';
import {ReactComponent as Logo} from '../images/logo.svg';
import {useState} from 'react';
import classNames from 'classnames/bind';

export default function Default({children}) {
  const [mobileMenuOpened, toggleMobileMenu] = useState(false);
  const mobileMenuClick = (e) => {
    e.preventDefault();
    toggleMobileMenu(!mobileMenuOpened);
  }
  return (
    <>
      <header>
        <div className="section">
          <a href="/" className={classNames({'mobile-menu': true, opened: mobileMenuOpened})} onClick={mobileMenuClick}/>
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