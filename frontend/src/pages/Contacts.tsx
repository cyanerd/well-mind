import Default from '../layouts/Default';
import React from 'react';

const Contacts: React.FC = () => {
  return (
    <Default>
      <div className="inner-page">
        <div className="section contacts-page">
          <h2>Контакты</h2>
          <div className="contacts-blocks-container">
            <div className="contacts-left-block">
              <p>Свяжитесь с нами</p>
              <p><a href="mailto:info@well-mind.ru">E-mail: info@well-mind.ru</a></p>
            </div>
            <div className="contacts-right-block">
              <p className="hide-desktop">Владелец:</p>
              <p><span className="hide-mobile">Владелец: </span>ИП Егоров Александр Андреевич</p>
              <p>ОГРНИП: 319774600117874</p>
            </div>
          </div>
        </div>
      </div>
    </Default>
  );
}

export default Contacts;