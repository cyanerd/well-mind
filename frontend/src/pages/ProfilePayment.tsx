import UserProfile from '../components/app/UserProfile';
import Button from '../components/Button';
import {ReactComponent as PhoneIcon} from '../images/icons/phone.svg';
import {ReactComponent as CardIcon} from '../images/icons/card.svg';
import {ReactComponent as OffIcon} from '../images/icons/off.svg';
import {ReactComponent as CircleArrowIcon} from '../images/icons/circle-arrow.svg';
import {useHistory} from 'react-router-dom';
import api from '../Api';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

const ProfilePayment: React.FC = () => {
  const history = useHistory();
  const user = useSelector((state: RootState) => state.app.user);

  return (
    <UserProfile>
      <div className="profile-buttons profile-buttons-payment">
        {/* Оплата Теле2 */}
        <Button disabled={user.subscription.active && user.subscription.payment === 'tele2'} onClick={() => {
          history.push('/promo');
        }} prependIcon={<PhoneIcon/>} appendIcon={<CircleArrowIcon/>} className="btn-blue">Оплата с мобильного</Button>

        {/* Оплата банковской картой */}
        <Button disabled={user.subscription.active && user.subscription.payment === 'card'} onClick={() => {
          history.push('/promo?mode=card');
        }} prependIcon={<CardIcon/>} appendIcon={<CircleArrowIcon/>} className="btn-blue">Банковская карта</Button>

        {/* Отключение услуги */}
        {user.subscription.active && <Button onClick={async () => {
          await api.request('cancel');
          await api.request('cancel_other');
          history.push('/profile?from=login');
        }} prependIcon={<OffIcon/>} appendIcon={<CircleArrowIcon/>} className="btn-blue">Отключить услугу</Button>}

        {/* Назад */}
        <Button onClick={history.goBack} className="btn-gray hide-desktop">Назад</Button>
      </div>
    </UserProfile>
  )
}

export default ProfilePayment;