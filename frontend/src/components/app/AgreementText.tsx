import React from 'react';
import {Link} from 'react-router-dom';

const AgreementText: React.FC = () => {
  return (
    <>
      Нажимая на кнопку “Продолжить” Вы принимаете <Link to="/offer">Условия использования сервиса
      “Well-mind”</Link>, даете <Link to="/policy">согласие на обработку своих персональных данных</Link> и соглашаетесь с
      условиями <Link to="/policy">политики конфиденциальности</Link>
    </>
  );
}

export default AgreementText;