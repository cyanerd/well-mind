import {useEffect, useState} from 'react';
import classNames from 'classnames/bind';
import {ReactComponent as Preloader} from '../images/icons/preloader.svg';

export default function Button(props) {
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    return () => setLoading(false);
  }, []);
  const handler = async (e) => {
    e.preventDefault();
    if (props.disabled || isLoading || !props.click) return;
    setLoading(true);
    await props.click();
    setLoading(false);
  }

  return (
    <a
      href="/"
      onClick={handler}
      className={classNames({
        btn: true,
        loading: isLoading,
        disabled: props.disabled,
        [props.className]: true
      })}
      style={props.style}
    >
      {!!props['prepend-icon'] && <span className="btn-icon-prepend">{props['prepend-icon']}</span>}
      <span>{props.children}</span>
      {!!props['append-icon'] && <span className="btn-icon-append">{props['append-icon']}</span>}
      <Preloader/>
    </a>
  )
}