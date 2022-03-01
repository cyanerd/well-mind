import Fullscreen from '../layouts/Fullscreen';
import {useDispatch, useSelector} from 'react-redux';
import React, {useState} from 'react';
import {RootState} from '../redux/store';
import Input from '../components/Input';
import Button from '../components/Button';
import api from '../Api';
import {validateEmail} from '../helper';
import {useHistory} from 'react-router-dom';
import {setUser} from '../redux/app';

const ProfileEmail: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.app.user);
  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const defaultErrors = {email: '', emailConfirm: ''};
  const [errors, setErrors] = useState(defaultErrors);

  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setErrors(defaultErrors);
    const checkResult = defaultErrors;
    if (!email.length) {
      checkResult.email = 'Введите e-mail';
      setErrors({...checkResult});
    } else if (!validateEmail(email)) {
      checkResult.email = 'Введите корректный e-mail';
      setErrors({...checkResult});
    }
    if (!emailConfirm.length) {
      checkResult.emailConfirm = 'Введите e-mail еще раз';
      setErrors({...checkResult});
    } else if (email !== emailConfirm) {
      checkResult.emailConfirm = 'Подтвердите e-mail';
      setErrors({...checkResult});
    }
    if (checkResult.email || checkResult.emailConfirm) return false;
    let response = await api.request('change_email', {email});

    if (response?.status === true) {
      dispatch(setUser(response.user));
      history.push('/profile?from=login');
    }
  }

  const EmailGoButton: React.FC = () => {
    return (<>{
      user.email.indexOf('well-mind') > -1 &&
      <Button onClick={() => {
        history.push('/profile/email-go');
      }} className="btn-blue email-change-go-to-btn">Зайти в почту</Button>
    }</>)
  }

  return (
    <Fullscreen>
      <div className="fullscreen fullscreen-separated section">
        <div className="left-block">
          <form onSubmit={submit} autoComplete="off" className="email-change-form">
            <h2>E-mail для чеков</h2>
            <div className="caption-description email-change-caption-description">
              <span className="email-change-sub-caption">Ваш текущий E-mail:</span>
              <b>{user.email}</b>
              <span className="hide-mobile">
                <EmailGoButton/>
              </span>
            </div>
            <div className="hide-desktop">
              <EmailGoButton/>
            </div>
            <div className="email-change-second-caption">
              <h3>Сменить E-mail</h3>
              <span>Введите новый e-mail, на который хотите получать чеки</span>
            </div>
            <div className="actions-container">
              <div className="input-container">
                <Input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors({...errors, email: ''});
                  }}
                  error={errors.email}
                  type="text"
                  name="email"
                  placeholder="E-mail"
                />
              </div>
              <div className="input-container">
                <Input
                  value={emailConfirm}
                  onChange={(e) => {
                    setEmailConfirm(e.target.value);
                    setErrors({...errors, emailConfirm: ''});
                  }}
                  error={errors.emailConfirm}
                  type="text"
                  name="emailConfirm"
                  placeholder="E-mail еще раз"
                />
              </div>
              <div className="input-container">
                <Button onClick={submit}>Сменить</Button>
              </div>
              <div className="input-container hide-desktop">
                <Button onClick={() => {
                  history.push('/profile?from=login');
                }} className="btn-gray">Назад</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fullscreen>
  );
}

export default ProfileEmail;