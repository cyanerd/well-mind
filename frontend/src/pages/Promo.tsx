import Fullscreen from '../layouts/Fullscreen';
import Button from '../components/Button';
import Input from '../components/Input';
import React, {useEffect, useState} from 'react';
import classNames from 'classnames/bind';
import AgreementText from '../components/app/AgreementText';
import api from '../Api';
import {useHistory, Link} from 'react-router-dom';
import {getURLParamValue, useInterval, declOfNum} from '../helper';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {setUser} from '../redux/app';
import {ReactComponent as Preloader} from '../images/icons/preloader.svg';

const Promo: React.FC = () => {
  const modes = ['phone', 'card', 'success', 'code'];
  let mode = getURLParamValue('mode');
  if (!modes.includes(mode)) mode = 'phone';
  const [ready, setReady] = useState(false);
  const [step, setStep] = useState(mode);
  const [phone, setPhone] = useState('');
  const [subscriptionId, setSubscriptionId] = useState('');
  const user = useSelector((state: RootState) => state.app.user);
  const dispatch = useDispatch();

  // @ts-ignore
  useEffect(async () => {
    if (user?.phone?.original && mode === 'phone') {
      const response = await api.request('promo_check_phone', {phone: user.phone.original});
      setSubscriptionId(response.subscription_id);
      setPhone(user.phone.original);
      setStep('code');
    }
    setReady(true);
  }, []); // user, mode нельзя их возвращать!

  const PhoneForm: React.FC<{
    setStep: Function,
    setPhone: Function,
    setSubscriptionId: Function
  }> = ({setStep, setPhone, setSubscriptionId}) => {
    const [agreement, setAgreement] = useState(true);
    const [phone, setCurrentPhone] = useState('');
    const defaultErrors = {phone: '', agreement: false};
    const [errors, setErrors] = useState(defaultErrors);
    const history = useHistory();

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
      const response = await api.request('promo_check_phone', {phone: '+' + phone});
      setSubscriptionId(response.subscription_id);
      setPhone(phone);
      if (response.status === false) {
        await api.request('send_code_other', {phone: '+' + phone});
        setStep('code');
      } else {
        if (response.login === true || response.exists === true) { // user exists
          history.push('/login?phone=' + phone + '&goto=program');
        }
        setStep('code');
      }
    }

    // @ts-ignore
    useEffect(async () => {
      const tele2Phone = await api.request('get_tele2_number');
      if (tele2Phone.phone) {
        setCurrentPhone(tele2Phone.phone);
      }
    }, []); // user, mode нельзя их возвращать!

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

  const CardForm = () => {
    const history = useHistory();

    useEffect(() => {
      console.log('renderWidget');
      const renderWidget = async () => {
        console.log('renderWidget2');
        const yandexToken = await api.request('yandex_confirmation_token');
        console.log('yandexToken', yandexToken);
        if (yandexToken.token) {
          // @ts-ignore
          const checkout = new window.YooMoneyCheckoutWidget({
            confirmation_token: yandexToken.token,
            return_url: 'https://well-mind.ru/promo?mode=success',
            embedded_3ds: false,
            error_callback(error: any) {
              console.error(error);
            }
          });
          console.log('checkout', checkout);
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

  const CodeForm: React.FC<{
    setStep: Function,
    phone: string,
    subscriptionId: string
  }> = ({setStep, phone, subscriptionId}) => {
    const SECONDS = 30;
    const [code, setCode] = useState('');
    const defaultErrors = {code: ''};
    const [errors, setErrors] = useState(defaultErrors);
    const [isCodeSubmitDisabled, setCodeSubmitDisabled] = useState(true);
    const [time, setTime] = useState(SECONDS);

    useInterval(() => {
      setTime(time - 1);
      if (time === 1) setCodeSubmitDisabled(false);
    }, 0);

    const sendCode = (phone: string, skipRequest: boolean = false) => {
      if (!skipRequest) api.request('promo_check_phone', {phone: '+' + phone});
      setTime(SECONDS);
      setCodeSubmitDisabled(true);
    }

    useEffect(() => {
      sendCode(phone, true);
    }, [phone]);

    const submit = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      setErrors(defaultErrors);
      const checkResult = defaultErrors;
      const response = await api.request('promo_check_code', {phone, code, subscription_id: subscriptionId});

      if (response.result === false) {
        checkResult.code = 'Код неверный';
        setErrors({...checkResult});
        return false;
      }

      // в любом случае нужно зассетить нового пользователя
      dispatch(setUser(response.user));

      await api.request('cancel_other');
      setStep('success');
    }
    return (
      <form onSubmit={submit} autoComplete="off" className="login-password-form">
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

  const CardSuccessForm: React.FC = () => {
    const [time, setTime] = useState(5);
    const history = useHistory();
    const link = user?.scheme ? '/program' : '/test';

    useInterval(() => {
      setTime(time - 1);
      if (time === 1) history.push(link);
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
            откроется подбор вашей программы. Если этого не произошло автоматически, пожалуйста, <Link to={link}>нажмите
            здесь</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <Fullscreen>
      <div className="fullscreen fullscreen-separated section">
        {ready && <div className="left-block">
          {step === 'phone' && <PhoneForm
            setSubscriptionId={(e: string) => setSubscriptionId(e)}
            setPhone={(e: string) => setPhone(e)}
            setStep={(e: string) => setStep(e)}
          />}
          {step === 'card' && <CardForm/>}
          {step === 'success' && <CardSuccessForm/>}
          {step === 'code' && phone && <CodeForm
            subscriptionId={subscriptionId}
            phone={phone}
            setStep={(e: string) => setStep(e)}
          />}
        </div>}
        {!ready && <div className="left-block"><Preloader/></div> }
      </div>
    </Fullscreen>
  );
}

export default Promo;
