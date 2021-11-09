import {Link} from "react-router-dom";
import {ReactComponent as Logo} from '../images/logo.svg';
import BackButton from '../components/BackButton';
import CloseButton from '../components/CloseButton';
import classNames from 'classnames/bind';

export default function Fullscreen({children, layout = {backButton: true, closeButton: false, class: 'fullscreen-background'}}) {
  return (
    <>
      <header className="fullscreen-header">
        <div className="section">
          <Link to="/" className="logo">
            <Logo/>
          </Link>
          {layout.backButton && <BackButton/>}
          {layout.closeButton && <CloseButton onClick={() => layout.closeHandler && layout.closeHandler()}/>}
        </div>
      </header>
      <main className={classNames({'site-content': true, 'fullscreen-site-content': true, [layout.class]: true})}>
        {children}
      </main>
    </>
  )
}