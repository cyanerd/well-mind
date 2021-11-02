import {ShepherdTour, TourMethods} from 'react-shepherd';
import 'shepherd.js/dist/css/shepherd.css';
import TourStart from './TourStart';

const buttons = [
  {
    classes: 'shepherd-button-secondary',
    text: 'Пропустить',
    type: 'cancel'
  },
  {
    classes: 'shepherd-button-back',
    text: '',
    type: 'back'
  },
  {
    classes: 'btn btn-stretched',
    text: 'Далее',
    type: 'next'
  }
];

const steps = [
  {
    id: 'program',
    attachTo: {element: '.tour-program', on: 'bottom'},
    buttons,
    highlightClass: 'highlight',
    scrollTo: false,
    cancelIcon: false,
    title: 'Поздравляем!',
    text: ['Теперь вам доступна индивидуальная программа занятий. Вы всегда сможете найти ее в разделе Программы'],
    modalOverlayOpeningPadding: 5,
    modalOverlayOpeningRadius: 5
  },
];

const tourOptions = {
  defaultStepOptions: {
    cancelIcon: {
      enabled: true
    }
  },
  useModalOverlay: true
};

export default function Tour() {
  return (
    <ShepherdTour steps={steps} tourOptions={tourOptions}>
      <TourMethods>
        {tourContext => <TourStart startTour={tourContext}/>}
      </TourMethods>
    </ShepherdTour>
  )
}