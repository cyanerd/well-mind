import Default from '../layouts/Default';
import {Link} from 'react-router-dom';
import React from 'react';

const NoMatch: React.FC = () => {
  return (
    <Default>
      <div className="inner-page">
        <div className="section">
          <h2>404 Ошибка</h2>
          <p>Страница не существует. <Link to="/">Вернуться на главную</Link></p>
        </div>
      </div>
    </Default>
  );
}

export default NoMatch;