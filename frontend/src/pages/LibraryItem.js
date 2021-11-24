import Default from '../layouts/Default';
import {useParams} from 'react-router-dom';
import api from '../Api';
import {useEffect, useState} from 'react';

export default function LibraryItem() {
  let {code} = useParams();
  const [item, setItem] = useState({});
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