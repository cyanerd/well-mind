import Default from '../layouts/Default';
import LibraryList from '../components/library/LibraryList';
import React from 'react';

const Library: React.FC = () => {
  return (
    <Default>
      <div className="inner-page">
        <div className="section">
          <h2>Библиотека</h2>
          <br/>
          {/*<div className="text-page">*/}
          {/*  <p>У вас может присутствовать ощущение, что люди, которых вы любите, бросят вас. Из-за этого убеждения вы цепляетесь*/}
          {/*    за*/}
          {/*    людей рядом, тем самым только отталкивая их от себя. Даже недолгая разлука сильно расстраивает или злит вас. Эта*/}
          {/*    схема*/}
          {/*    наделяет вас отчаянным желанием любить. Как бы хорошо сейчас отношения не складывались, у вас присутствует ощущение*/}
          {/*    «конечности», которое вызывает тревогу.</p>*/}
          {/*</div>*/}
          <LibraryList/>
        </div>
      </div>
    </Default>
  );
}

export default Library;