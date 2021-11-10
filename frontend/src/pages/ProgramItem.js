import Default from '../layouts/Default';
import {useParams} from 'react-router-dom';
import Button from '../components/Button';
import {useHistory} from 'react-router';
import {useEffect} from 'react';
import {ReactComponent as ArrowBack} from '../images/icons/back-arrow.svg';

export default function ProgramItem() {
  const history = useHistory();
  const {day} = useParams();
  const item = {
    id: day,
    day,
    text: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dolor nisl, tempus nec massa sit amet, imperdiet eleifend neque. Nunc eleifend magna mauris, sed ornare ipsum porttitor pellentesque. Etiam scelerisque placerat vulputate. Vestibulum pellentesque cursus felis, vitae hendrerit ex. Sed dapibus cursus congue. Etiam laoreet auctor ante, suscipit venenatis felis euismod et. Etiam sed magna eu ligula euismod convallis. Fusce id vestibulum mi. Morbi aliquet pharetra nulla, quis lacinia nisi lacinia id. Phasellus sit amet nibh vel lorem rutrum tincidunt eget et purus. Sed iaculis ipsum eget malesuada convallis. Etiam non neque et metus fringilla tristique ac nec erat.</p>',
    goal: 'расслабиться, успокоиться.',
    status: 'general'
  }

  // если урок закрыт - редирект на программу
  useEffect(() => {
    if (item.status === 'disabled') history.push('/program');
  }, [history, item.status]);

  return (
    <Default>
      <div className="inner-page">
        <div className="section text-page">
          <h2>Упражнение {item.day}</h2>
          <div className="program-item-goal">Цель: {item.goal}</div>
          <div dangerouslySetInnerHTML={{__html: item.text}}/>
          <div className="program-item-buttons">
            <Button onClick={() => {
              history.push('/program');
            }} className="btn-gray btn-stretched btn-fullwidth">
              <span className="hide-mobile">Назад</span>
              <span className="hide-desktop-inline"><ArrowBack/></span>
            </Button>
            {item.status !== 'completed' && <Button className="btn-blue btn-stretched btn-fullwidth">Урок выполнен</Button>}
          </div>
        </div>
      </div>
    </Default>
  );
}