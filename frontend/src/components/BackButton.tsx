import {ReactComponent as BackIcon} from "../images/icons/back.svg";
import {useHistory} from 'react-router-dom';
import React from 'react';

const BackButton: React.FC = () => {
  const history = useHistory();
  const click = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    history.goBack();
  }
  return (
    <a href="/" onClick={click} className="back-link">
      <BackIcon/>
      <span>Назад</span>
    </a>
  )
}

export default BackButton;