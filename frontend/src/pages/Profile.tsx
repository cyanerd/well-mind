import Button from '../components/Button';
import {ReactComponent as PaymentIcon} from '../images/icons/payment.svg';
import {ReactComponent as LockIcon} from '../images/icons/lock.svg';
import {ReactComponent as EmailIcon} from '../images/icons/email.svg';
import {ReactComponent as NextArrowIcon} from '../images/icons/next-arrow.svg';
import {useDispatch} from 'react-redux';
import {setUser} from '../redux/app';
import UserProfile from '../components/app/UserProfile';
import {useHistory} from 'react-router-dom';
import React from 'react';
import {setMode, setScheme} from '../redux/test';

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <UserProfile>
      <div className="profile-dashboard-bottom">
        <div className="profile-buttons">
          <Button onClick={() => {
            history.push('/profile/payment');
          }} prependIcon={<PaymentIcon/>} className="btn-blue">Способ оплаты</Button>
          <Button onClick={() => {
            history.push('/profile/change-password');
          }} prependIcon={<LockIcon/>} appendIcon={<NextArrowIcon/>} className="btn-blue">Смена пароля</Button>
          <Button onClick={() => {
            history.push('/profile/email');
          }} prependIcon={<EmailIcon/>} appendIcon={<NextArrowIcon/>} className="btn-blue">E-mail для чеков</Button>
          <Button onClick={() => {
            dispatch(setMode('intro'));
            dispatch(setUser(null));
            dispatch(setScheme(0));
            history.push('/');
          }} className="btn-blue">Выйти</Button>
        </div>
      </div>
    </UserProfile>
  )
}

export default Profile;