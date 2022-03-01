import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

interface IProgramLinkProps {
  component: any, // todo & review: remove
  linkProp: string
}

const ProgramLink: React.FC<IProgramLinkProps> = (props) => {
  const user = useSelector((state: RootState) => state.app.user);
  const [link, setLink] = useState('/');
  useEffect(() => {
    const promoLink = {
      '/program': user && user.scheme,
      '/test': user && !user.scheme,
      '/promo': !user
    } as any; // todo & review: remove
    const value = Object.keys(promoLink).find((key) => promoLink[key]);
    if (value) setLink(value);
  }, [user]);
  return React.cloneElement(props.component, {[props.linkProp]: link});
}

export default ProgramLink;