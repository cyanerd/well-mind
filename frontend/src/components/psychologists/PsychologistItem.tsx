import React, {useState} from 'react';
import Button from '../Button';
import {imagePath, validateEmail} from '../../helper';
import IPsychologistItem from './type';
import Input from '../Input';
import api from '../../Api';

const PsychologistsItem: React.FC<{ item: IPsychologistItem }> = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const defaultErrors = {name: '', email: ''};
  const [errors, setErrors] = useState(defaultErrors);
  const [item, setItem] = useState(props.item);

  const submit = async (e: React.SyntheticEvent, item: IPsychologistItem) => {
    e.preventDefault();
    setItem({...item, form_sent: false});
    setErrors(defaultErrors);
    const checkResult = defaultErrors;
    if (!name.length) {
      checkResult.name = 'Введите имя';
      setErrors({...checkResult});
    }
    if (!email.length) {
      checkResult.email = 'Введите e-mail';
      setErrors({...checkResult});
    } else if (!validateEmail(email)) {
      checkResult.email = 'Введите корректный e-mail';
      setErrors({...checkResult});
    }
    if (checkResult.name || checkResult.email) return false;
    await api.request('consultation', {name, email, consultant_id: item.id});
    setName('');
    setEmail('');
    setItem({...item, form_sent: true});
  }

  const openForm = (item: IPsychologistItem) => {
    setItem({...item, form_opened: true});
  }

  return (
    <div className="ps-item">
      <div className="ps-item-photo">
        <img src={imagePath(item.image, true)} alt="Well-mind"/>
        {item.name && <div className="ps-item-name" dangerouslySetInnerHTML={{__html: item.name.split(' ').join('<br/>')}}/>}
      </div>
      <div className="ps-item-text">
        {item.detail_text && <p dangerouslySetInnerHTML={{__html: item.detail_text}}/>}
      </div>

      <form onSubmit={(e) => submit(e, item)} autoComplete="off" className="login-password-form">
        <div className="input-container">
          {item.form_opened && <div className="consult-inputs">
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors({...errors, name: ''});
              }}
              error={errors.name}
              autoComplete="name"
              type="text"
              name="name"
              placeholder="Ваше Имя"
            />
            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({...errors, email: ''});
              }}
              error={errors.email}
              autoComplete="email"
              type="text"
              name="email"
              placeholder="Ваш E-mail"
            />
            <Button onClick={(e: React.SyntheticEvent) => submit(e, item)} className="btn-blue">
              {!item.form_sent && 'Отправить'}
              {item.form_sent && 'Отправлено'}
            </Button>
          </div>}
          {!item.form_opened &&
          <Button onClick={() => openForm(item)} className="btn-blue">Записаться</Button>}
        </div>
      </form>

    </div>
  );
}

export default PsychologistsItem;