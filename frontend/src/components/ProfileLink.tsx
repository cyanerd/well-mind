import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import React from 'react';
import {RootState} from '../redux/store';

const ProfileLink: React.FC = () => {
  const user = useSelector((state: RootState) => state.app.user);
  const link = user ? '/profile' : '/login';
  return <Link to={link} className="profile-link"/>
}

export default ProfileLink;