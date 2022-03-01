import React, {useEffect, useState} from 'react';
import classNames from 'classnames/bind';
import {ReactComponent as Preloader} from '../images/icons/preloader.svg';

interface IButtonProps {
  disabled?: boolean,
  className?: string,
  style?: object,
  prependIcon?: React.ReactNode,
  appendIcon?: React.ReactNode,
  onClick?: Function
}

const Button: React.FC<IButtonProps> = (props) => {
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    return () => setLoading(false);
  }, []);
  const handler = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (props.disabled || isLoading || !props.onClick) return;
    setLoading(true);
    await props.onClick(e);
    setLoading(false);
  }

  return (
    <a
      href="/"
      onClick={handler}
      className={classNames({
          ...{
            btn: true,
            loading: isLoading,
            disabled: props.disabled,
          },
          ...(props.className ? {[props.className]: true} : {})
        }
      )}
      style={props.style}
    >
      {!!props.prependIcon && <span className="btn-icon-prepend">{props.prependIcon}</span>}
      <span>{props.children}</span>
      {!!props.appendIcon && <span className="btn-icon-append">{props.appendIcon}</span>}
      <Preloader/>
    </a>
  )
}

export default Button;