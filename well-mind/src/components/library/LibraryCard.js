import LinesEllipsis from 'react-lines-ellipsis';

export default function LibraryCard({item}) {
  return (
    <div className="library-card">
      <div className="library-card-title">{item.title}</div>
      <div className="library-card-text">
        <LinesEllipsis text={item.text} maxLine={7}/>
      </div>
      <div className="centered-btn-container">
        <a href="#" className="library-card-button">Читать</a>
      </div>
    </div>
  )
}