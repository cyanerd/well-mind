import Fullscreen from '../layouts/Fullscreen';
import RestoreFormPassword from '../components/forms/RestoreFormPassword';
import {useSelector} from 'react-redux';
import React from 'react';
import {RootState} from '../redux/store';

const ProfileChangePassword: React.FC = () => {
  const user = useSelector((state: RootState) => state.app.user);
  return (
    <Fullscreen>
      <div className="fullscreen fullscreen-separated section">
        <div className="left-block">
          <RestoreFormPassword mode="change" phone={user.phone.original}/>
        </div>
      </div>
    </Fullscreen>
  );
}

export default ProfileChangePassword;