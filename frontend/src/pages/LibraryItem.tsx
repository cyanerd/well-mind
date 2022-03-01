import Default from '../layouts/Default';
import {useParams} from 'react-router-dom';
import api from '../Api';
import React, {useEffect, useState} from 'react';

interface ILibraryItem {
  name: string,
  detail_text?: string
}

const LibraryItem: React.FC = () => {
  let {code} = useParams<{ code: string }>();
  const [item, setItem] = useState<ILibraryItem>({ name: '' });
  const {response} = api.useAxios('get_library_item', {code});
  useEffect(() => {
    if (response?.item) setItem(response.item);
  }, [response]);

  return (
    <Default>
      <div className="inner-page">
        <div className="section text-page">
          <h2>{item.name}</h2>
          <div className="text-page">
            {item.detail_text && <div dangerouslySetInnerHTML={{__html: item.detail_text}}/>}
            {!item.detail_text && <span className="gray-text">Пока нет детального описания...</span>}
          </div>
        </div>
      </div>
    </Default>
  );
}

export default LibraryItem;