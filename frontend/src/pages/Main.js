import MainPage from '../components/MainPage';
import ProgramPage from '../components/ProgramPage';
import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import TestPage from '../components/TestPage';

export default function Main() {
  const user = useSelector(state => state.app.user);
  const [component, setComponent] = useState('/');
  useEffect(() => {
    const components = {
      'program': user && user.scheme,
      'test': user && !user.scheme,
      'main': !user
    }
    setComponent(Object.keys(components).find((key) => components[key]));
  }, [user]);

  return (<>
    {component === 'main' && <MainPage/>}
    {component === 'program' && <ProgramPage/>}
    {component === 'test' && <TestPage/>}
  </>);
}