import classNames from 'classnames/bind';

export default function Status(props) {
  return (<div className={classNames({
    'profile-status': true,
    'profile-status-success': props.green,
    'profile-status-error': props.red
  })}>{props.children}</div>);
}