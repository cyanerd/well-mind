import TestIntro from '../components/test/TestIntro';
import TestStep from '../components/test/TestStep';
import TestResult from '../components/test/TestResult';
import {usePersistedState} from '../helper';

export default function Test() {
  const [step, setStep] = usePersistedState('step');
  return (
    <>
      {!step && <TestIntro setStep={e => setStep(e)}/>}
      {step > 0 && step !== 'finish' && <TestStep step={step} setStep={e => setStep(e)}/>}
      {step === 'finish' && <TestResult/>}
    </>
  );
}