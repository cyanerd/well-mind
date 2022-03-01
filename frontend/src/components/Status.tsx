import classNames from 'classnames/bind';
import React from 'react';

interface IStatusProps {
  success: boolean,
  successMessage: string,
  errorMessage: string
}

const Status: React.FC<IStatusProps> = (props) => {
  return (<div className={classNames({
    'profile-status': true,
    'profile-status-success': props.success,
    'profile-status-error': !props.success
  })}>{props.success ? props.successMessage : props.errorMessage}</div>);
}

export default Status;