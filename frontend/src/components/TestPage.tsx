import TestIntro from '../components/test/TestIntro';
import TestStep from '../components/test/TestStep';
import TestResult from '../components/test/TestResult';
import {useSelector} from 'react-redux';
import React from 'react';
import {RootState} from '../redux/store';

const TestPage: React.FC = () => {
  const mode = useSelector((state: RootState) => state.test.mode);
  if (mode === 'test') return <TestStep/>;
  if (mode === 'finish') return <TestResult/>;
  return <TestIntro/>;
}

export default TestPage;