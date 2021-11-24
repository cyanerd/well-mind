import LinesEllipsis from 'react-lines-ellipsis';
import {Link} from 'react-router-dom';

export default function LibraryCard({item}) {
  return (
    <div className="library-card">
      <div className="library-card-title">{item.name}</div>
      <div className="library-card-text">
        <LinesEllipsis text={item.preview_text} maxLine={7}/>
      </div>
      <div className="library-card-buttons-container">
        <Link to={`/library/${item.code}`} className="library-card-button">Читать</Link>
      </div>
    </div>
  )
}