import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

export default function ProfileLink() {
  const user = useSelector(state => state.app.user);
  const link = user ? '/profile' : '/login';
  return <Link to={link} className="profile-link"/>
}