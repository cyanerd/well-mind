import Default from '../../layouts/Default';
import {Link} from 'react-router-dom';
import ProgramLink from '../app/ProgramLink';
import {useEffect, useState} from 'react';
import api from '../../Api';
import {useSelector} from 'react-redux';

export default function TestResult() {
  const [item, setItem] = useState({});
  const user = useSelector(state => state.app.user);
  const {response} = api.useAxios('get_schemas_item', {id: user?.scheme});
  useEffect(() => {
    if (response?.item) setItem(response.item);
  }, [response]);

  return (
    <Default>
      <div className="inner-page test-result-page">
        <div className="section">
          <h2>{ item.name }</h2>
          {/*У вас может присутствовать ощущение, что люди, которых вы любите, бросят вас. Из-за этого*/}
          {/*убеждения вы цепляетесь за людей рядом, тем самым только отталкивая их от себя. Даже недолгая разлука сильно*/}
          {/*расстраивает или злит вас. Эта схема наделяет вас отчаянным желанием любить. Как бы хорошо сейчас отношения не*/}
          {/*складывались, у вас присутствует ощущение «конечности», которое вызывает <span*/}
          {/*className="library-reference">тревогу <span className="library-text">Lorem ipsum dolor sit amet,*/}
          {/*  consectetur adipiscing elit. Pellentesque vestibulum justo arcu, ultrices luctus lacus interdum sit amet.*/}
          {/*  Praesent vel venenatis orci. Duis iaculis sit amet odio sit amet sodales.</span></span>.*/}
          <p style={{maxWidth: '950px'}} dangerouslySetInnerHTML={{__html: item.description}} />
          <div className="test-result-caption">
            Мы подобрали для вас программу упражнений, которая поможет справиться с вашими трудностями.
          </div>
          <div className="centered-btn-container">
            <ProgramLink linkProp="to" component={
              <Link to="/" className="btn">Получить программу</Link>
            }/>
          </div>
        </div>
      </div>
    </Default>
  )
}