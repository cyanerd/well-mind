import UserProfile from '../components/app/UserProfile';
import Button from '../components/Button';
import {ReactComponent as PhoneIcon} from '../images/icons/phone.svg';
import {ReactComponent as CardIcon} from '../images/icons/card.svg';
import {ReactComponent as OffIcon} from '../images/icons/off.svg';
import {ReactComponent as CircleArrowIcon} from '../images/icons/circle-arrow.svg';
import {useHistory} from 'react-router-dom';
import api from '../Api';

export default function ProfilePayment() {
  const history = useHistory();

  return (
    <UserProfile>
      <div className="profile-buttons profile-buttons-payment">
        {/* Оплата Теле2 */}
        <Button onClick={() => {
          history.push('/promo?mode=code');
        }} prependIcon={<PhoneIcon/>} appendIcon={<CircleArrowIcon/>} className="btn-blue">Оплата с мобильного</Button>

        {/* Оплата банковской картой */}
        <Button onClick={() => {
          history.push('/promo?mode=card');
        }} prependIcon={<CardIcon/>} appendIcon={<CircleArrowIcon/>} className="btn-blue">Банковская карта</Button>

        {/* Отключение услуги */}
        <Button onClick={async () => {
          await api.request('cancel');
          history.push('/profile?from=login');
        }} prependIcon={<OffIcon/>} appendIcon={<CircleArrowIcon/>} className="btn-blue">Отключить услугу</Button>

        {/* Назад */}
        <Button onClick={history.goBack} className="btn-gray hide-desktop">Назад</Button>
      </div>
    </UserProfile>
  )
}