import Default from '../../layouts/Default';
import { Link } from 'react-router-dom';

export default function TestResult() {
  return (
    <Default>
      <div className="inner-page">
        <div className="section">
          <h2>Отверженность</h2>
          <p style={{maxWidth: '950px'}}>У вас может присутствовать ощущение, что люди, которых вы любите, бросят вас. Из-за этого
            убеждения вы цепляетесь за людей рядом, тем самым только отталкивая их от себя. Даже недолгая разлука сильно
            расстраивает или злит вас. Эта схема наделяет вас отчаянным желанием любить. Как бы хорошо сейчас отношения не
            складывались, у вас присутствует ощущение «конечности», которое вызывает <span
              className="library-reference">тревогу <span className="library-text">Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Pellentesque vestibulum justo arcu, ultrices luctus lacus interdum sit amet.
            Praesent vel venenatis orci. Duis iaculis sit amet odio sit amet sodales.</span></span>.
          </p>
          <div className="test-result-caption">
            Мы подобрали для вас программу упражнений, которая поможет справиться с вашими трудностями.
          </div>
          <div className="centered-btn-container" style={{marginTop: '60px'}}>
            <Link to="/test" className="btn" style={{maxWidth: '330px', width: '100%'}}>Получить программу</Link>
          </div>
        </div>
      </div>
    </Default>
  )
}