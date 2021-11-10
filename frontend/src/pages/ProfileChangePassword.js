import Fullscreen from '../layouts/Fullscreen';
import RestoreFormPassword from '../components/forms/RestoreFormPassword';
import {useSelector} from 'react-redux';

export default function ProfileChangePassword() {
  const user = useSelector(state => state.app.user);
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