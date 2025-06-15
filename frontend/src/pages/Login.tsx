import Fullscreen from '../layouts/Fullscreen';
import Button from '../components/Button';
import Input from '../components/Input';
import AgreementText from '../components/app/AgreementText';
import api from '../Api';
import React, {useEffect, useState} from 'react';
import classNames from 'classnames/bind';
import {setUser} from '../redux/app';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import RestoreFormPassword from '../components/forms/RestoreFormPassword';
import {getURLParamValue, useInterval} from '../helper';

const Login: React.FC = () => {
  const phoneFromPromo = getURLParamValue('phone');
  const gotoFromPromo = getURLParamValue('goto');
  const [step, setStep] = useState('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (step === 'phone' && phoneFromPromo) {
      setPhone(phoneFromPromo);
      setStep('password');
    }
  }, []);

  const login = async (user: any) => {
    dispatch(setUser(user));
    const link = gotoFromPromo === 'program' ? (
      user?.scheme ? 'program' : 'test'
    ) : '/profile?from=login';
    history.push(link);
  }

  const PhoneForm: React.FC<{ setStep: Function, setPhone: Function }> = ({setStep, setPhone}) => {
    const [agreement, setAgreement] = useState(true);
    const [phone, setCurrentPhone] = useState('');
    const defaultErrors = {phone: '', agreement: false};
    const [errors, setErrors] = useState(defaultErrors);
    const submit = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      setErrors(defaultErrors);
      const checkResult = defaultErrors;
      if (!phone.length) {
        checkResult.phone = 'Введите телефон';
        setErrors({...checkResult});
      } else if (phone.length !== 11) {
        checkResult.phone = 'Проверьте телефон';
        setErrors({...checkResult});
      }
      if (!agreement) {
        checkResult.agreement = true;
        setErrors({...checkResult});
      }
      if (checkResult.phone || checkResult.agreement) return false;
      const response = await api.request('check_user', {phone: '+' + phone});
      setPhone(phone);
      if (response.status !== true) {
        // регистрация
        setStep('reg');
      } else {
        // вход
        setStep('password');
      }
    }
    return (
      <form onSubmit={submit} autoComplete="off" className="login-phone-form">
        <h2>Вход или регистрация</h2>
        <div className="caption-description">Введите номер телефона <span
          className="hide-desktop-inline">для входа или регистрации</span></div>
        <div className="actions-container">
          <div className="input-container">
            <Input
              value={phone}
              onChange={(e) => {
                setCurrentPhone(e.target.value.replace(/[^0-9]+/g, ''));
                setErrors({...errors, phone: ''});
              }}
              error={errors.phone}
              type="text"
              mask="+7 (999) 999-99-99"
              maskChar={null}
              name="phone"
              placeholder="Номер телефона"
            />
            <Button onClick={submit}>Отправить</Button>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              checked={agreement}
              onChange={() => {
                setAgreement(!agreement);
                setErrors({...errors, agreement: false});
              }}
              name="agreement"
              id="agreement"
              className={classNames({error: errors.agreement})}
            />
            <label htmlFor="agreement">
              <AgreementText/>
            </label>
          </div>
        </div>
      </form>
    );
  }

  const PasswordForm: React.FC<{ setStep: Function, phone: string }> = ({setStep, phone}) => {
    const [password, setPassword] = useState('');
    const defaultErrors = {password: ''};
    const [errors, setErrors] = useState(defaultErrors);
    const submit = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      setErrors(defaultErrors);
      const checkResult = defaultErrors;
      if (!password.length) {
        checkResult.password = 'Введите пароль';
        setErrors({...checkResult});
        return false;
      }
      const response = await api.request('login', {phone, password});
      if (response.error === true) {
        checkResult.password = 'Пароль неверный';
        setErrors({...checkResult});
        return false;
      }
      login(response.user);
    }
    return (
      <form onSubmit={submit} autoComplete="off" className="login-password-form">
        <h2>Вход</h2>
        <div className="caption-description">Данный номер телефона уже зарегистрирован, введите пароль для входа</div>
        <div className="actions-container">
          <div className="input-container">
            <Input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({...errors, password: ''});
              }}
              autoComplete="password"
              type="password"
              name="password"
              placeholder="Пароль"
              error={errors.password}
            />
            <Button onClick={submit}>Отправить</Button>
          </div>
          <a
            href="/"
            className="forgot-password-link"
            onClick={(e) => {
              e.preventDefault();
              setStep('restore');
            }}
          >
            Забыли пароль
          </a>
        </div>
      </form>
    );
  }

  const RestoreFormCode: React.FC<{ setStep: Function, setCode: Function, phone: string }> = ({setStep, setCode, phone}) => {
    const SECONDS = 30;
    const defaultErrors = {code: ''};
    const [code, setLocalCode] = useState('');
    const [errors, setErrors] = useState(defaultErrors);
    const [isCodeSubmitDisabled, setCodeSubmitDisabled] = useState(true);
    const [time, setTime] = useState(SECONDS);

    useInterval(() => {
      setTime(time - 1);
      if (time === 1) setCodeSubmitDisabled(false);
    }, 0);

    const sendCode = (phone: string) => {
      api.request('forgot_password', {phone});
      setTime(SECONDS);
      setCodeSubmitDisabled(true);
    }

    useEffect(() => {
      sendCode(phone);
    }, [phone]);

    const submit = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      setErrors(defaultErrors);
      const checkResult = defaultErrors;
      const response = await api.request('check_code', {phone, code});

      if (response.status === false) {
        checkResult.code = 'Код неверный';
        setErrors({...checkResult});
        return false;
      }
      setStep('new_password');
      setCode(code);
    }
    return (
      <form onSubmit={submit} autoComplete="off" className="login-password-form">
        <h2>Восстановление доступа</h2>
        <div className="caption-description">Чтобы создать новый пароль введите код из смс</div>
        <div className="actions-container">
          <div className="input-container">
            <Input
              type="text"
              name="code"
              placeholder="Код"
              value={code}
              onChange={(e) => {
                setLocalCode(e.target.value);
                setErrors({...errors, code: ''});
              }}
              error={errors.code}
              mask="9999"
              maskChar={null}
            />
            {code.length === 4 && <Button onClick={submit}>Отправить</Button>}
            {code.length !== 4 && <Button
              disabled={isCodeSubmitDisabled}
              onClick={() => sendCode(phone)}>
              Отправить еще раз {time > 0 ? '0:' + (time > 9 ? time : '0' + time) : ''}
            </Button>}
          </div>
        </div>
      </form>
    );
  }

  const RegForm: React.FC<{ phone: string }> = ({phone}) => {
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const defaultErrors = {password: '', passwordConfirm: ''};
    const [errors, setErrors] = useState(defaultErrors);
    const submit = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      setErrors(defaultErrors);
      const checkResult = defaultErrors;
      if (!password.length) {
        checkResult.password = 'Введите пароль';
        setErrors({...checkResult});
      } else if (password.length < 6) {
        checkResult.password = 'Пароль должен содержать не менее 6 символов';
        setErrors({...checkResult});
      }
      if (!passwordConfirm.length) {
        checkResult.passwordConfirm = 'Повторите пароль';
        setErrors({...checkResult});
      } else if (passwordConfirm.length < 6) {
        checkResult.passwordConfirm = 'Пароль должен содержать не менее 6 символов';
        setErrors({...checkResult});
      }
      if (password !== passwordConfirm) {
        checkResult.passwordConfirm = 'Ошибка подтверждения пароля';
        setErrors({...checkResult});
      }
      if (checkResult.password || checkResult.passwordConfirm) return false;
      const response = await api.request('register', {phone, password, password_confirm: passwordConfirm});

      if (response?.status === true) {
        login(response.user);
      }
    }
    return (
      <form onSubmit={submit} autoComplete="off" className="login-password-form">
        <h2>Регистрация</h2>
        <div className="caption-description">Данный номер телефона еще не зарегистрирован, задайте пароль для входа</div>
        <div className="input-container">
          <Input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors({...errors, password: ''});
            }}
            error={errors.password}
            autoComplete="password"
            type="password"
            name="password"
            placeholder="Пароль"
          />
          <Input
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
              setErrors({...errors, passwordConfirm: ''});
            }}
            error={errors.passwordConfirm}
            autoComplete="password-confirm"
            type="password"
            name="password-confirm"
            placeholder="Пароль еще раз"
          />
          <Button onClick={submit}>Зарегистрироваться</Button>
        </div>
      </form>
    );
  }

  return (
    <Fullscreen>
      <div className="fullscreen fullscreen-separated section">
        <div className="left-block">
          {step === 'phone' && <PhoneForm setPhone={(e: string) => setPhone(e)} setStep={(e: string) => setStep(e)}/>}
          {step === 'password' && <PasswordForm phone={phone} setStep={(e: string) => setStep(e)}/>}
          {step === 'restore' && <RestoreFormCode setCode={(e: string) => setCode(e)} phone={phone} setStep={(e: string) => setStep(e)}/>}
          {step === 'new_password' && <RestoreFormPassword code={code} phone={phone}/>}
          {step === 'reg' && <RegForm phone={phone}/>}
        </div>
      </div>
    </Fullscreen>
  );
}

export default Login;
