import {ReactComponent as CloseIcon} from "../images/icons/close.svg";

export default function CloseButton({onClick}) {
  const click = (e) => {
    e.preventDefault();
    onClick();
  }
  return <a href="/" onClick={click} className="close-button"><CloseIcon/></a>;
}