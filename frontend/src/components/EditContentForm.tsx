import React, {useEffect, useState} from 'react';
import Button from './Button';
import eventBus from '../EventBus';
import api from '../Api';
import { Fancybox } from "@fancyapps/ui";
import {useDispatch} from 'react-redux';
import {fetchContent} from '../redux/fetchContent';

const EditContentForm: React.FC = () => {
  const [content, setContent] = useState('');
  const [code, setCode] = useState('');
  const dispatch = useDispatch();

  const submit = async () => {
    await api.request('update_texts', { content, code });
    dispatch(fetchContent());
    Fancybox.close();
  }

  useEffect(() => {
    eventBus.on('SET_EDIT_CONTENT_DATA', (payload: any) => {
      setContent(payload.content);
      setCode(payload.code);
    });
  }, []);

  return <>
    <h3>Редактировать контент</h3>
    <textarea value={content} onChange={(e) => setContent(e.target.value)} />
    <div style={{ marginTop: '20px' }}>
      <Button onClick={submit}>Сохранить</Button>
    </div>
  </>
}

export default EditContentForm;