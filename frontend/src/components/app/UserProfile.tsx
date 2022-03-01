import Fullscreen from '../../layouts/Fullscreen';
import Status from '../Status';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {getURLParamValue, imagePath} from '../../helper';
import React from 'react';
import {RootState} from '../../redux/store';

const UserProfile: React.FC = (props) => {
  const user = useSelector((state: RootState) => state.app.user);
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
                    <Status success={user?.subscription?.active} successMessage="Оплачено" errorMessage="Не оплачено"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-phone-block hide-desktop">
              <div className="profile-label">Ваш номер:</div>
              <div className="profile-value">{user?.phone?.formatted}</div>
            </div>
            { props.children }
          </div>
        </div>
      </div>
    </Fullscreen>
  );
}

export default UserProfile;