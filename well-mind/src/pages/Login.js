import Fullscreen from '../layouts/Fullscreen';
import Button from '../components/Button';
import Input from '../components/Input';
import AgreementText from '../components/app/AgreementText';
import api from '../Api';
import {useState} from 'react';
import classNames from 'classnames/bind';

export default function Login() {
  const [step, setStep] = useState('phone');

  /*const PhoneForm = () => {
    return (
      <>
        <h2>Вход и регистрация</h2>
        <div className="caption-description">Войдите, чтобы подобрать программу</div>
        <div className="input-description">Введите свой номер телефона</div>
        <div className="input-container">
          <Input type="text" mask="+7 (999) 999-99-99" name="phone" maskChar={null}/>
          <Button click={submit}>Отправить</Button>
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

  const PhoneForm = ({setStep}) => {
    const [agreement, setAgreement] = useState(true);
    const [phone, setPhone] = useState(''); // 79059178877
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
      const response = await api.request('check_user', {phone});
      setStep('password');
      console.log(response);
      return response;
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
                setPhone(e.target.value.replace(/[^0-9]+/g, ''));
                setErrors({...errors, phone: false});
              }}
              type="text"
              mask="+7 (999) 999-99-99"
              name="phone"
              placeholder="Номер телефона"
              maskChar={null}
              error={errors.phone}
            />
            <Button click={submit}>Отправить</Button>
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

  const PasswordForm = ({setStep}) => {
    return (
      <form autoComplete="off" className="login-password-form">
        <h2>Вход</h2>
        <div className="caption-description">Данный номер телефона уже зарегистрирован, введите пароль для входа</div>
        <div className="actions-container">
          <div className="input-container">
            <Input autoComplete="password" type="password" name="password" placeholder="Пароль"/>
            <Button>Отправить</Button>
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

  const RestoreForm = ({setStep}) => {
    return (
      <form autoComplete="off" className="login-password-form">
        <h2>Восстановление доступа</h2>
        <div className="caption-description">Чтобы создать новый пароль введите код из смс</div>
        <div className="actions-container">
          <div className="input-container">
            <Input type="text" name="code" placeholder="Код"/>
            <Button>Отправить еще раз</Button>
          </div>
        </div>
      </form>
    );
  }

  const RegForm = ({setStep}) => {
    return (
      <form autoComplete="off" className="login-password-form">
        <h2>Регистрация</h2>
        <div className="caption-description">Данный номер телефона еще не зарегистрирован, задайте пароль для входа</div>
        <div className="input-container">
          <Input autoComplete="password" type="password" name="password" placeholder="Пароль"/>
          <Input autoComplete="password-confirm" type="password" name="password-confirm" placeholder="Пароль еще раз"/>
          <Button>Зарегистрироваться</Button>
        </div>
      </form>
    );
  }

  return (
    <Fullscreen>
      <div className="fullscreen fullscreen-separated section">
        <div className="left-block">
          {step === 'phone' && <PhoneForm setStep={(e) => setStep(e)}/>}
          {step === 'password' && <PasswordForm setStep={(e) => setStep(e)}/>}
          {step === 'restore' && <RestoreForm setStep={(e) => setStep(e)}/>}
          {step === 'reg' && <RegForm setStep={(e) => setStep(e)}/>}
        </div>
      </div>
    </Fullscreen>
  );
}