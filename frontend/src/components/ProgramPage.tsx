import Default from '../layouts/Default';
import LessonsList from '../components/lesson/LessonsList';
import LibraryCards from '../components/library/LibraryCards';
import Tour from '../components/tour/Tour';
import api from '../Api';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {RootState} from '../redux/store';
import EditableContent from '../components/EditableContent';

interface IProgramItem {
  name?: string,
  description?: string
}

interface IResponseObject {
  response: {
    item: IProgramItem
  }
}

const ProgramPage: React.FC = () => {
  const [item, setItem] = useState<IProgramItem>({});
  const history = useHistory();
  const user = useSelector((state: RootState) => state.app.user);
  const {response} = api.useAxios<IResponseObject>('get_schemas_item', {id: user?.scheme});
  useEffect(() => {
    if (!user?.scheme) history.push('/');
  }, [history, user?.scheme]);
  useEffect(() => {
    if (response?.item) setItem(response.item);
  }, [response]);

  // useEffect(() => {
  // if (!user || !user.subscription || !user.subscription.active) history.push('/promo');
  // }, [history, user]);

  return (
    <>
      <Tour/>
      <Default>
        <div className="inner-page">
          <div className="section program-page">
            <h2>
              <span className="hide-mobile">Ваша психологическая схема:</span>
              <span className="hide-desktop-inline">Программа</span>
              <br/> {item.name}
            </h2>
            <div className="program-text">
              {/*<div className="_two-columns">*/}
              {/*  <p></p>*/}
              {/*  <p></p>*/}
              {/*</div>*/}
              {item.description && <p dangerouslySetInnerHTML={{__html: item.description}}/>}
            </div>
            <div className="program-lessons-list">
              <h2><span className="tour-lessons">Упражнения</span></h2>
              <LessonsList/>
            </div>
            <div className="program-library-list">
              <h2>Библиотека</h2>
              <LibraryCards/>
            </div>
            <h2><EditableContent code="main18" /></h2>
            <div className="program-text">
              <div className="_two-columns">
                <EditableContent code="main19" />
              </div>
            </div>
            <div className="centered-btn-container" style={{marginBottom: 0}}>
              <Link
                to="/psychologists"
                className="btn btn-blue tour-consult"
                style={{maxWidth: '400px', display: 'block', margin: '0 auto'}}
              >
                Подобрать психолога
              </Link>
            </div>
          </div>
        </div>
      </Default>
    </>
  );
}

export default ProgramPage;