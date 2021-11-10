import classNames from 'classnames/bind';

export default function Status(props) {
  return (<div className={classNames({
    'profile-status': true,
    'profile-status-success': props.success,
    'profile-status-error': !props.success
  })}>{props.success ? props.successMessage : props.errorMessage}</div>);
}