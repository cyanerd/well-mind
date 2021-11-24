import {useState} from 'react';
import api from '../../Api';
import Input from '../Input';
import Button from '../Button';
import {setUser} from '../../redux/app';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

export default function RestoreFormPassword({phone, mode = 'restore'}) {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const defaultErrors = {password: false, passwordConfirm: false};
  const [errors, setErrors] = useState(defaultErrors);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = async (user) => {
    dispatch(setUser(user));
    history.push('/profile?from=login');
  }

  const submit = async (e) => {
    e.preventDefault();
    setErrors(defaultErrors);
    const checkResult = defaultErrors;
    if (!password.length) {
      checkResult.password = 'Введите пароль';
      setErrors({...checkResult});
    }
    if (!passwordConfirm.length) {
      checkResult.passwordConfirm = 'Повторите пароль';
      setErrors({...checkResult});
    }
    if (password !== passwordConfirm) {
      checkResult.passwordConfirm = 'Ошибка подтверждения пароля';
      setErrors({...checkResult});
    }
    if (checkResult.password || checkResult.passwordConfirm) return false;
    const response = await api.request('change_password', {phone, password, password_confirm: passwordConfirm});
    console.log('change_password', response, {phone, password, password_confirm: passwordConfirm});

    if (response?.status === true) {
      login(response.user);
    }
  }
  return (
    <form onSubmit={submit} autoComplete="off" className="login-password-form">
      <h2>
        {mode === 'restore' && 'Восстановление доступа'}
        {mode === 'change' && 'Смена пароля'}
      </h2>
      <div className="caption-description">
        {mode === 'restore' && 'Задайте новый пароль для входа'}
        {mode === 'change' && 'Задайте новый пароль для входа. Пароль должен содержать минимум 6 символов, любые цифры и/или буквы'}
      </div>
      <div className="actions-container">
        <div className="input-container">
          <Input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors({...errors, password: false});
            }}
            error={errors.password || 0}
            autoComplete="password"
            type="password"
            name="password"
            placeholder="Пароль"
          />
          <Input
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
              setErrors({...errors, passwordConfirm: false});
            }}
            error={errors.passwordConfirm || 0}
            autoComplete="password-confirm"
            type="password"
            name="password-confirm"
            placeholder="Пароль еще раз"
          />
          <Button onClick={submit}>Войти</Button>
        </div>
      </div>
    </form>
  );
}