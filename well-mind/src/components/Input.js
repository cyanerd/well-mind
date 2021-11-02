import InputMask from 'react-input-mask';
import classNames from 'classnames/bind';

export default function Input(props) {
  return (
    <div className={classNames({input: true, error: !!props.error})}>
      <div className="input-error">{props.error}</div>
      <InputMask {...props} />
    </div>
  );
}