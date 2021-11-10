import Fullscreen from '../layouts/Fullscreen';
import Button from '../components/Button';
import Status from '../components/Status';
import {imagePath} from '../helper';
import {ReactComponent as PaymentIcon} from '../images/icons/payment.svg';
import {ReactComponent as LockIcon} from '../images/icons/lock.svg';
import {ReactComponent as EmailIcon} from '../images/icons/email.svg';
import {ReactComponent as NextArrowIcon} from '../images/icons/next-arrow.svg';
import {useSelector, useDispatch} from 'react-redux';
import {setUser} from '../redux/app';
import {useHistory} from 'react-router-dom';
import {getURLParamValue} from '../helper';

export default function Profile() {
  const user = useSelector(state => state.app.user);
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <Fullscreen layout={{
      closeButton: true,
      closeHandler: () => {
        if (getURLParamValue('from') === 'login') history.push('/');
        else history.goBack();
      },
      class: 'fullscreen-single-background fullscreen-no-background-mobile',
    }}>
      <div className="inner-page">
        <div className="fullscreen section">
          <div className="profile-dashboard">
            <div className="profile-dashboard-top">
              <div className="profile-avatar">
                <img src={imagePath('avatar.png')} alt="Well-mind"/>
              </div>
              <div className="profile-status-container">
                <div className="left-block hide-mobile">
                  <div className="profile-label">Ваш номер:</div>
                  <div className="profile-value">{user?.phone?.formatted}</div>
                </div>
                <div className="right-block">
                  <div className="profile-label">Ваш статус:</div>
                  <div className="profile-statuses">
                    <Status success={user?.subscription?.active} successMessage="Подключено" errorMessage="Не подключено"/>
                    <Status success={user?.subscription?.payment} successMessage="Оплачено" errorMessage="Не оплачено"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-phone-block hide-desktop">
              <div className="profile-label">Ваш номер:</div>
              <div className="profile-value">{user?.phone?.formatted}</div>
            </div>
            <div className="profile-dashboard-bottom">
              <div className="profile-buttons">
                <Button prependIcon={<PaymentIcon/>} className="btn-blue">Способ оплаты</Button>
                <Button onClick={() => {
                  history.push('/profile/change-password');
                }} prependIcon={<LockIcon/>} appendIcon={<NextArrowIcon/>} className="btn-blue">Смена пароля</Button>
                <Button onClick={() => {
                  history.push('/profile/email-go');
                }} prependIcon={<EmailIcon/>} appendIcon={<NextArrowIcon/>} className="btn-blue">E-mail для чеков</Button>
                <Button onClick={() => {
                  dispatch(setUser(null));
                  history.push('/');
                }} className="btn-blue">Выйти</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fullscreen>
  )
}