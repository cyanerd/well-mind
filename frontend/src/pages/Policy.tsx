import Default from '../layouts/Default';
import React, {useEffect, useState} from 'react';
import api from '../Api';

const Policy: React.FC = () => {
  const [item, setItem] = useState<{ name: string, detail_text: string }>({name: '', detail_text: ''});
  const { response } = api.useAxios('get_content', {id: 1596});
  useEffect(() => {
    if (response?.item) setItem(response.item);
  }, [response]);

  return (
    <Default>
      <div className="inner-page">
        <div className="section text-page">
          <h2>{item.name}</h2>
          {item.detail_text && <div dangerouslySetInnerHTML={{__html: item.detail_text}}/>}
        </div>
      </div>
    </Default>
  );
}

export default Policy;