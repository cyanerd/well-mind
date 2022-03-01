import {ReactComponent as CloseIcon} from '../images/icons/close.svg';
import React from 'react';

interface ICloseButtonProps {
  onClick: Function
}

const CloseButton: React.FC<ICloseButtonProps> = ({onClick}) => {
  const click = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    onClick();
  }
  return <a href="/" onClick={click} className="close-button"><CloseIcon/></a>;
}
export default CloseButton;