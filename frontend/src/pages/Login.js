import Fullscreen from '../layouts/Fullscreen';
import Button from '../components/Button';
import Input from '../components/Input';
import AgreementText from '../components/app/AgreementText';
import api from '../Api';
import {useEffect, useRef, useState} from 'react';
import classNames from 'classnames/bind';
import {setUser} from '../redux/app';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
// import {sleep} from '../helper';
import RestoreFormPassword from '../components/forms/RestoreFormPassword';

function useInterval(callback, trigger) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [trigger]);
}

export default function Login() {
  const [step, setStep] = useState('phone');
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const login = async (user) => {
    dispatch(setUser(user));
    // await sleep(500); // иначе не успевает установиться пользователь и его снова выкидывает на /login
    history.push('/profile?from=login');
  }

  /*const PhoneForm = () => {
    return (
      <>
        <h2>Вход и регистрация</h2>
        <div className="caption-description">Войдите, чтобы подобрать программу</div>
        <div className="input-description">Введите свой номер телефона</div>
        <div className="input-container">
          <Input type="text" mask="+7 (999) 999-99-99" name="phone" maskChar={null}/>
          <Button onClick={submit}>Отправить</Button>
        </div>
        <div className="checkbox-container">
          <input type="checkbox" name="agreement" id="agreement"/>
          <label htmlFor="agreement">Нажимая на кнопку “Продолжить” Вы принимаете <a href="#">Условия использования сервиса
            “Well-mind”</a>, даете <a href="#">согласие на обработку своих персональных данных</a> и соглашаетесь с
            условиями <a href="#">политики конфиденциальности</a></label>
        </div>
      </>
    );
  }*/

  const PhoneForm = ({setStep, setPhone}) => {
    const [agreement, setAgreement] = useState(true);
    const [phone, setCurrentPhone] = useState(''); // 79059178877
    const defaultErrors = {phone: false, agreement: false};
    const [errors, setErrors] = useState(defaultErrors);
    const submit = async () => {
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
      console.log('check_user', response, phone);
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
      <form autoComplete="off" className="login-phone-form">
        <h2>Вход или регистрация</h2>
        <div className="caption-description">Введите номер телефона <span
          className="hide-desktop-inline">для входа или регистрации</span></div>
        <div className="actions-container">
          <div className="input-container">
            <Input
              value={phone}
              onChange={(e) => {
                setCurrentPhone(e.target.value.replace(/[^0-9]+/g, ''));
                setErrors({...errors, phone: false});
              }}
              error={errors.phone || 0}
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

  const PasswordForm = ({setStep, phone}) => {
    const [password, setPassword] = useState('');
    const defaultErrors = {password: false};
    const [errors, setErrors] = useState(defaultErrors);
    const submit = async () => {
      setErrors(defaultErrors);
      const checkResult = defaultErrors;
      if (!password.length) {
        checkResult.password = 'Введите пароль';
        setErrors({...checkResult});
        return false;
      }
      const response = await api.request('login', {phone, password});
      console.log('login', response, {phone, password})
      if (response.error === true) {
        checkResult.password = 'Пароль неверный';
        setErrors({...checkResult});
        return false;
      }
      login(response.user);
    }
    return (
      <form autoComplete="off" className="login-password-form">
        <h2>Вход</h2>
        <div className="caption-description">Данный номер телефона уже зарегистрирован, введите пароль для входа</div>
        <div className="actions-container">
          <div className="input-container">
            <Input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({...errors, password: false});
              }}
              autoComplete="password"
              type="password"
              name="password"
              placeholder="Пароль"
              error={errors.password || 0}
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

  const RestoreFormCode = ({setStep, phone}) => {
    const SECONDS = 30;
    const [code, setCode] = useState('');
    const defaultErrors = {code: false};
    const [errors, setErrors] = useState(defaultErrors);
    const [isCodeSubmitDisabled, setCodeSubmitDisabled] = useState(true);
    const [time, setTime] = useState(SECONDS);

    useInterval(() => {
      setTime(time - 1);
      if (time === 1) setCodeSubmitDisabled(false);
    }, 0);

    const sendCode = (phone) => {
      api.request('forgot_password', {phone});
      console.log('forgot_password', phone);
      setTime(SECONDS);
      setCodeSubmitDisabled(true);
    }

    useEffect(() => {
      sendCode(phone);
    }, [phone]);

    const submit = async () => {
      setErrors(defaultErrors);
      const checkResult = defaultErrors;
      const response = await api.request('check_code', {phone, code});
      console.log('check_code', response, {phone, code})

      if (response.status === false) {
        checkResult.code = 'Код неверный';
        setErrors({...checkResult});
        return false;
      }
      setStep('new_password');
    }
    return (
      <form autoComplete="off" className="login-password-form">
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
                setCode(e.target.value);
                setErrors({...errors, code: false});
              }}
              error={errors.code || 0}
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

  const RegForm = () => {
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const defaultErrors = {password: false, passwordConfirm: false};
    const [errors, setErrors] = useState(defaultErrors);
    const submit = async () => {
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
      const response = await api.request('register', {phone, password, password_confirm: passwordConfirm});
      console.log('register', response, {phone, password, password_confirm: passwordConfirm});

      if (response?.status === true) {
        login(response.user);
      }
    }
    return (
      <form autoComplete="off" className="login-password-form">
        <h2>Регистрация</h2>
        <div className="caption-description">Данный номер телефона еще не зарегистрирован, задайте пароль для входа</div>
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
          <Button onClick={submit}>Зарегистрироваться</Button>
        </div>
      </form>
    );
  }

  return (
    <Fullscreen>
      <div className="fullscreen fullscreen-separated section">
        <div className="left-block">
          {step === 'phone' && <PhoneForm setPhone={(e) => setPhone(e)} setStep={(e) => setStep(e)}/>}
          {step === 'password' && <PasswordForm phone={phone} setStep={(e) => setStep(e)}/>}
          {step === 'restore' && <RestoreFormCode phone={phone} setStep={(e) => setStep(e)}/>}
          {step === 'new_password' && <RestoreFormPassword phone={phone}/>}
          {step === 'reg' && <RegForm phone={phone}/>}
        </div>
      </div>
    </Fullscreen>
  );
}