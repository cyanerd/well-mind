import InputMask, {Props as IInputMaskProps} from 'react-input-mask';
import classNames from 'classnames/bind';
import React from 'react';

interface IInputProps extends Partial<IInputMaskProps> {
  error: string,
  maskChar?: string | null // cause of https://github.com/sanniassin/react-input-mask/issues/249
}

const Input: React.FC<IInputProps> = (props) => {
  return (
    <div className={classNames({input: true, error: !!props.error})}>
      <div className="input-error">{props.error}</div>
      {/* @ts-ignore */}
      <InputMask {...props} />
    </div>
  );
}

export default Input;