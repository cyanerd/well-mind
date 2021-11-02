import {ReactComponent as BackIcon} from "../images/icons/back.svg";
import {useHistory} from 'react-router-dom';

export default function BackButton() {
  const history = useHistory();
  const click = (e) => {
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