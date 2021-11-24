import TestIntro from '../components/test/TestIntro';
import TestStep from '../components/test/TestStep';
import TestResult from '../components/test/TestResult';
import {useSelector} from 'react-redux';

export default function TestPage() {
  const mode = useSelector(state => state.test.mode);
  if (mode === 'test') return <TestStep/>;
  if (mode === 'finish') return <TestResult/>;
  return <TestIntro/>;
}