import Default from '../layouts/Default';
import LessonsList from '../components/lesson/LessonsList';
import LibraryCards from '../components/library/LibraryCards';
import Tour from '../components/tour/Tour';
import api from '../Api';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';

export default function ProgramPage() {
  const [item, setItem] = useState({});
  const history = useHistory();
  const user = useSelector(state => state.app.user);
  const {response} = api.useAxios('get_schemas_item', {id: user?.scheme});
  useEffect(() => {
    if (!user?.scheme) history.push('/');
  }, [history, user?.scheme]);
  useEffect(() => {
    if (response?.item) setItem(response.item);
  }, [response]);

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
              <p dangerouslySetInnerHTML={{__html: item.description}}/>
            </div>
            <div className="program-lessons-list">
              <h2><span className="tour-lessons">Упражнения</span></h2>
              <LessonsList/>
            </div>
            <div className="program-library-list">
              <h2>Библиотека</h2>
              <LibraryCards/>
            </div>
            <h2>Проконсультируйтесь<br/> с психологом</h2>
            <div className="program-text">
              <div className="_two-columns">
                <p>Остались вопросы по результатам теста или выполнению программы? Чувствуете, что вам необходима помощь со
                  стороны?
                  Вы можете получить отдельную консультацию или индивидуальные занятия в дополнение к вашей основной
                  программе. </p>
                <p>Мы предлагаем вам только дипломированных специалистов с реальным опытом работы, прошедших собеседование с
                  командой
                  Well-mind<br/>
                  <span style={{color: '#0a005a'}}>Формат общения на выбор: очно или онлайн.</span>
                </p>
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