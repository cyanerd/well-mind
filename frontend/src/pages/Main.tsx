import MainPage from '../components/MainPage';
import ProgramPage from '../components/ProgramPage';
import {useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import TestPage from '../components/TestPage';
import {RootState} from '../redux/store';
import TestResult from '../components/test/TestResult';

const Main: React.FC = () => {
  const user = useSelector((state: RootState) => state.app.user);
  const [component, setComponent] = useState('/');
  useEffect(() => {
    const components = {
      'program': Boolean(user && user.scheme && user.subscription?.active),
      'test-result': Boolean(user && user.scheme && !user.subscription?.active),
      'test': Boolean(user && !user.scheme),
      'main': Boolean(!user),
    }
    // @ts-ignore
    const componentToSet = Object.keys(components).find((key: string) => components[key]);
    if (componentToSet) setComponent(componentToSet);

  }, [user]);

  return (<>
    {component === 'main' && <MainPage/>}
    {component === 'program' && <ProgramPage/>}
    {component === 'test' && <TestPage/>}
    {component === 'test-result' && <TestResult/>}
  </>);
}

export default Main;