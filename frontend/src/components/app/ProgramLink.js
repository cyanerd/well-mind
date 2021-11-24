import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

export default function ProgramLink(props) {
  const user = useSelector(state => state.app.user);
  const [link, setLink] = useState('/');
  useEffect(() => {
    const promoLink = {
      '/program': user && user.scheme,
      '/test': user && !user.scheme,
      '/promo': !user
    }
    setLink(Object.keys(promoLink).find((key) => promoLink[key]));
  }, [user]);
  return React.cloneElement(props.component, {[props.linkProp]: link});
}