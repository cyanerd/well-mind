import {useEffect} from 'react';
import {useLocation} from 'react-router';

const RouterApi = (props) => {
  const location = useLocation();

  useEffect(() => {
    console.log('route change', location);
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>
};

export default RouterApi;