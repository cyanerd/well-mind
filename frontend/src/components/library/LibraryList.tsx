import {Link} from 'react-router-dom';
import api from '../../Api';
import React, {useState, useEffect} from 'react';

interface IGroupItem {
  code: string,
  name: string,
  id: number
}

interface IGroup {
  group: number,
  children: IGroupItem[]
}

const LibraryList: React.FC = () => {
  const {response} = api.useAxios('get_library_list');
  const [groups, setGroups] = useState<IGroup[]>([]);
  useEffect(() => {
    if (response?.list?.length) {
      const data = response.list
        .sort((a: IGroupItem, b: IGroupItem) => a.name.localeCompare(b.name))
        .reduce((r: any, e: IGroupItem) => {
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

export default LibraryList;