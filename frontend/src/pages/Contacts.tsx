import Default from '../layouts/Default';
import React from 'react';
import EditableContent from '../components/EditableContent';

const Contacts: React.FC = () => {
  return (
    <Default>
      <div className="inner-page">
        <div className="section contacts-page">
          <h2>Контакты</h2>
          <div className="contacts-blocks-container">
            <div className="contacts-left-block">
              <p><EditableContent code="contacts1" /></p>
              <p><EditableContent code="contacts2" /></p>
            </div>
            <div className="contacts-right-block">
              <p className="hide-desktop">Владелец:</p>
              <p><span className="hide-mobile">Владелец: </span><EditableContent code="contacts3" /></p>
              <p><EditableContent code="contacts4" /></p>
            </div>
          </div>
        </div>
      </div>
    </Default>
  );
}

export default Contacts;