import Fullscreen from '../layouts/Fullscreen';
import {useEffect} from 'react';
import api from '../Api';
import {useHistory} from 'react-router-dom';

export default function ProfileEmailGo() {
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      return await api.request('get_link_to_mail');
    }
    const response = fetchData();
    if (response.link) window.location.href = response.link;
    else history.push('/profile?from=login');
  }, [history]);

  return (
    <Fullscreen layout={{
      closeButton: false,
      class: 'fullscreen-single-background fullscreen-no-background-mobile',
    }}>
      <div className="inner-page">
        <div className="fullscreen section">
          <h2>Подождите...</h2>
        </div>
      </div>
    </Fullscreen>
  )
}