import {Link} from 'react-router-dom';
import api from '../../Api';
import {useState, useEffect} from 'react';

export default function LibraryCards() {
  const { response } = api.useAxios('get_library_list');
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    if (response?.list?.length) {
      const data = response.list.sort((a, b) => a.name.localeCompare(b.name)).reduce((r, e) => {
        let group = e.name[0];
        if (!r[group]) r[group] = {group, children: [e]}
        else r[group].children.push(e);
        return r;
      }, {});
      setGroups(Object.values(data));
    }
  }, [response]);

  return (
    <>
      <div className="library-list-index">
        {groups.map(group => (
          <div key={group.group} className="library-group">
            <div className="library-group-caption">{group.group}</div>
            {group.children.map(item => (
              <div key={item.id} className="library-group-items">
                <div className="library-group-item">
                  <Link to={`/library/${item.code}`}>{item.name}</Link>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}