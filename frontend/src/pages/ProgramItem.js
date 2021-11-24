import Default from '../layouts/Default';
import {useParams} from 'react-router-dom';
import Button from '../components/Button';
import {useHistory} from 'react-router';
import {useEffect, useState} from 'react';
import {ReactComponent as ArrowBack} from '../images/icons/back-arrow.svg';
import api from '../Api';

export default function ProgramItem() {
  const history = useHistory();
  const {id} = useParams();
  const [item, setItem] = useState({});
  const {response} = api.useAxios('get_schemas_exercises_item', {id});
  useEffect(() => {
    if (response?.item) setItem(response.item);
  }, [response]);

  // если урок закрыт - редирект на программу
  // useEffect(() => {
  // if (item.id && !item.current) history.push('/program');
  // }, [history, item.current]);

  const complete = async () => {
    await api.request('get_schemas_exercises_list', {done: item.id});
    history.push('/program');
  }

  return (
    <Default>
      <div className="inner-page">
        <div className="section text-page">
          <h2>Упражнение {item.sort}</h2>
          <div className="program-item-goal">Цель: {item.name}</div>
          <div dangerouslySetInnerHTML={{__html: item.detail_text}}/>
          <div className="program-item-buttons">
            <Button onClick={() => {
              history.push('/program');
            }} className="btn-gray btn-stretched btn-fullwidth">
              <span className="hide-mobile">Назад</span>
              <span className="hide-desktop-inline"><ArrowBack/></span>
            </Button>
            {!item.status &&
            <Button onClick={complete} className="btn-blue btn-stretched btn-fullwidth">Урок выполнен</Button>}
          </div>
        </div>
      </div>
    </Default>
  );
}