import {Link} from 'react-router-dom';

export default function LibraryCards() {
  const items = [
    {
      id: 1,
      title: 'Тревога',
    },
    {
      id: 2,
      title: 'Успех',
    },
    {
      id: 3,
      title: 'Страх',
    },
    {
      id: 4,
      title: 'Сова',
    },
    {
      id: 5,
      title: 'Удод',
    },
  ];
  const data = items.sort((a, b) => a.title.localeCompare(b.title)).reduce((r, e) => {
    let group = e.title[0];
    if (!r[group]) r[group] = {group, children: [e]}
    else r[group].children.push(e);
    return r;
  }, {})
  const groups = Object.values(data);

  return (
    <>
      <div className="library-list-index">
        {groups.map(group => (
          <div key={group.group} className="library-group">
            <div className="library-group-caption">{group.group}</div>
            {group.children.map(item => (
              <div key={item.id} className="library-group-items">
                <div className="library-group-item">
                  <Link to={`/library/${item.id}`}>{item.title}</Link>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}