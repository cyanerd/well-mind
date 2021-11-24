import Fullscreen from '../layouts/Fullscreen';
import Button from '../components/Button';
import Input from '../components/Input';
import {useEffect, useState} from 'react';
import classNames from 'classnames/bind';
import AgreementText from '../components/app/AgreementText';
import api from '../Api';
import {useHistory, Link} from 'react-router-dom';
import {getURLParamValue, useInterval, declOfNum} from '../helper';
import {useSelector} from 'react-redux';

export default function Promo() {
  const modes = ['phone', 'card', 'success', 'code'];
  let mode = getURLParamValue('mode');
  if (!modes.includes(mode)) mode = 'phone';
  const [step, setStep] = useState(mode);
  const [phone, setPhone] = useState('');
  const [subscriptionId, setSubscriptionId] = useState('');
  const user = useSelector(state => state.app.user);

  useEffect(() => {
    if (user?.phone?.original && mode === 'phone') {
      setPhone(user.phone.original);
      setStep('code');
    }
  }, [user, mode]);

  const PhoneForm = ({setStep, setPhone, setSubscriptionId}) => {
    const [agreement, setAgreement] = useState(true);
    const [phone, setCurrentPhone] = useState('');
    const defaultErrors = {phone: false, agreement: false};
    const [errors, setErrors] = useState(defaultErrors);
    const history = useHistory();

    const submit = async (e) => {
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
      const response = await api.request('promo_check_phone', {phone: '+' + phone});
      console.log('promo_check_phone', response, phone);
      setSubscriptionId(response.subscription_id);
      setPhone(phone);
      if (response.status === false) {
        await api.request({action: 'send_code_other', options: {phone: '+' + phone}});
        console.log('send_code_other', phone);
        setStep('code');
      } else {
        if (response.login === true || response.exists === true) { // user exists
          history.push('/login?phone=' + phone);
        }
        setStep('code');
      }
    }

    return (
      <form onSubmit={submit} autoComplete="off" className="login-phone-form promo-phone-form">
        <h2>Вход и регистрация</h2>
        <div className="caption-description">Войдите, чтобы подобрать программу</div>
        <div className="input-description">Введите свой номер телефона</div>
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

  const CardForm = () => {
    const history = useHistory();

    useEffect(() => {
      const renderWidget = async () => {
        const yandexToken = await api.request('yandex_confirmation_token');
        if (yandexToken.token) {
          const checkout = new window.YooMoneyCheckoutWidget({
            confirmation_token: yandexToken.token,
            return_url: 'https://well-mind.ru/promo?mode=success',
            embedded_3ds: false,
            error_callback(error) {
              console.log(error);
            }
          });
          checkout.render('payment-form');
        }
      }
      renderWidget();
    }, []);

    return (
      <div style={{maxWidth: '460px'}}>
        <div className="input-container">
          <div id="payment-form"/>
        </div>
        <div className="input-container" style={{marginTop: '10px'}}>
          <Button
            onClick={() => history.push('/profile/payment')}
            className="btn"
            style={{width: '100%'}}
          >
            Отмена
          </Button>
        </div>
      </div>
    )
  }

  const CodeForm = ({setStep, phone, subscriptionId}) => {
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
      api.request('promo_check_phone', {phone});
      console.log('promo_check_phone', phone);
      setTime(SECONDS);
      setCodeSubmitDisabled(true);
    }

    useEffect(() => {
      sendCode(phone);
    }, [phone]);

    const submit = async () => {
      setErrors(defaultErrors);
      const checkResult = defaultErrors;
      const response = await api.request('promo_check_code', {phone, code, subscription_id: subscriptionId});
      console.log('promo_check_code', response, {phone, code, subscriptionId})

      if (response.result === false) {
        checkResult.code = 'Код неверный';
        setErrors({...checkResult});
        return false;
      }

      await api.request('cancel_other');
      setStep('success');
    }
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
      }} autoComplete="off" className="login-password-form">
        <h2>Введите код из СМС</h2>
        <div className="caption-description"/>
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

  const CardSuccessForm = () => {
    const [time, setTime] = useState(5);
    const history = useHistory();

    useInterval(() => {
      setTime(time - 1);
      if (time === 1) history.push('/test');
    }, 0);

    return (
      <div className="promo-success-block">
        <h2>Поздравляем!</h2>
        <div className="promo-success-text">
          <p>
            Услуга успешно подключена, и теперь мы сможем подобрать для вас индивидуальную программу для работы над своей
            проблемой
          </p>
          <p>
            Через <h2>{time} {declOfNum(time, ['секунда', 'секунды', 'секунд'])}</h2> <br/>
            откроется подбор вашей программы. Если этого не произошло автоматически, пожалуйста, <Link to="/test">нажмите
            здесь</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <Fullscreen>
      <div className="fullscreen fullscreen-separated section">
        <div className="left-block">
          {step === 'phone' &&
          <PhoneForm setSubscriptionId={(e) => setSubscriptionId(e)} setPhone={(e) => setPhone(e)} setStep={(e) => setStep(e)}/>}
          {step === 'card' && <CardForm/>}
          {step === 'success' && <CardSuccessForm/>}
          {step === 'code' && phone && <CodeForm subscriptionId={subscriptionId} phone={phone} setStep={(e) => setStep(e)}/>}
        </div>
      </div>
    </Fullscreen>
  );
}