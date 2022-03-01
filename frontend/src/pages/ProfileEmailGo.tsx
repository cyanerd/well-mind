import Fullscreen from '../layouts/Fullscreen';
import React, {useEffect} from 'react';
import api from '../Api';
import {useHistory} from 'react-router-dom';

const ProfileEmailGo: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.request('get_link_to_mail');
      if (response.link) window.location.href = response.link;
      else history.push('/profile?from=login');
    }
    fetchData();
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

export default ProfileEmailGo;