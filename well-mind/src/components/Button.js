import {useEffect, useState} from 'react';
import classNames from 'classnames/bind';
import {ReactComponent as Preloader} from '../images/icons/preloader.svg';

export default function Button({click, children, style, className, disabled}) {
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    return () => setLoading(false);
  }, []);
  const handler = async (e) => {
    e.preventDefault();
    if (disabled || isLoading || !click) return;
    setLoading(true);
    await click();
    setLoading(false);
  }
  return (
    <a
      href="/"
      onClick={handler}
      className={classNames({btn: true, loading: isLoading, disabled, [className]: true})}
      style={style}
    >
      <span>{children}</span>
      <Preloader/>
    </a>
  )
}