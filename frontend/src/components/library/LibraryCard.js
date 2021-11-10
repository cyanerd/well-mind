import LinesEllipsis from 'react-lines-ellipsis';
import {Link} from 'react-router-dom';

export default function LibraryCard({item}) {
  return (
    <div className="library-card">
      <div className="library-card-title">{item.title}</div>
      <div className="library-card-text">
        <LinesEllipsis text={item.text} maxLine={7}/>
      </div>
      <div className="library-card-buttons-container">
        <Link to={`/library/${item.id}`} className="library-card-button">Читать</Link>
      </div>
    </div>
  )
}