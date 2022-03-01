import LinesEllipsis from 'react-lines-ellipsis';
import {Link} from 'react-router-dom';
import React from 'react';

interface ILibraryCardProps {
  item: {
    name: string,
    code: string,
    preview_text: string
  }
}

const LibraryCard: React.FC<ILibraryCardProps> = ({item}) => {
  return (
    <div className="library-card">
      <div className="library-card-title">
        <LinesEllipsis text={item.name} maxLine={4}/>
      </div>
      {/*<div className="library-card-text">*/}
      {/*  <LinesEllipsis text={item.preview_text} maxLine={7}/>*/}
      {/*</div>*/}
      <div className="library-card-buttons-container">
        <Link to={`/library/${item.code}`} className="library-card-button">Читать</Link>
      </div>
    </div>
  )
}

export default LibraryCard;