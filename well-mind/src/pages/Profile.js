import Fullscreen from '../layouts/Fullscreen';
import Button from '../components/Button';
import Status from '../components/Status';
import {imagePath} from '../helper';
import {ReactComponent as PaymentIcon} from '../images/icons/payment.svg';
import {ReactComponent as LockIcon} from '../images/icons/lock.svg';
import {ReactComponent as EmailIcon} from '../images/icons/email.svg';
import {ReactComponent as NextArrowIcon} from '../images/icons/next-arrow.svg';

export default function Profile() {
  return (
    <Fullscreen layout={{
      closeButton: true,
      class: 'fullscreen-single-background',
    }}>
      <div className="fullscreen section">
        <div className="profile-dashboard">
          <div className="profile-dashboard-top">
            <div className="profile-avatar">
              <img src={imagePath('avatar.png')} alt="Well-mind"/>
            </div>
            <div className="profile-status-container">
              <div className="left-block hide-mobile">
                <div className="profile-label">Ваш номер:</div>
                <div className="profile-value">+7 999 888 99 99</div>
              </div>
              <div className="right-block">
                <div className="profile-label">Ваш статус:</div>
                <div className="profile-statuses">
                  <Status green>Подключено</Status>
                  <Status red>Не оплачено</Status>
                </div>
              </div>
            </div>
          </div>
          <div className="profile-phone-block hide-desktop">
            <div className="profile-label">Ваш номер:</div>
            <div className="profile-value">+7 999 888 99 99</div>
          </div>
          <div className="profile-dashboard-bottom">
            <div className="profile-buttons">
              <Button prepend-icon={<PaymentIcon/>} className="btn-blue">Способ оплаты</Button>
              <Button prepend-icon={<LockIcon/>} append-icon={<NextArrowIcon/>} className="btn-blue">Смена пароля</Button>
              <Button prepend-icon={<EmailIcon/>} append-icon={<NextArrowIcon/>} className="btn-blue">E-mail для чеков</Button>
              <Button className="btn-blue">Выйти</Button>
            </div>
          </div>
        </div>
      </div>
    </Fullscreen>
  )
}