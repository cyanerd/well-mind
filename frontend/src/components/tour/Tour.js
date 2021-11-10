import {ShepherdTour, TourMethods} from 'react-shepherd';
import 'shepherd.js/dist/css/shepherd.css';
import TourStart from './TourStart';

const buttons = {
  cancel: {
    classes: 'shepherd-button-secondary',
    text: 'Пропустить',
    type: 'cancel'
  },
  back: {
    classes: 'shepherd-button-back',
    text: '',
    type: 'back'
  },
  next: {
    classes: 'btn btn-stretched',
    text: 'Далее',
    type: 'next'
  },
  complete: {
    classes: 'btn btn-stretched',
    text: 'Начать',
    type: 'complete'
  }
};

const stepDefault = {
  highlightClass: 'highlight',
  scrollTo: {
    behavior: 'smooth',
    block: 'center'
  },
  cancelIcon: false,
  modalOverlayOpeningPadding: 5,
  modalOverlayOpeningRadius: 5,
}

let steps = [
  {
    ...stepDefault,
    id: 'program',
    attachTo: {element: '.tour-program', on: 'bottom'},
    title: 'Поздравляем!',
    text: ['Теперь вам доступна индивидуальная программа занятий. Вы всегда сможете найти ее в разделе Программы'],
  },
  {
    ...stepDefault,
    id: 'lessons',
    attachTo: {element: '.tour-lessons', on: 'top'},
    text: ['Каждый день вам нужно выполнять по одному упражнению для работы с вашими проблемами. В программе всего 30 упражнений, на их выполнение вам дается 45 дней. По завершению текущей программы, вы сможете снова пройти тест, чтобы скорректировать программу согласно вашему прогрессу'],
  },
  {
    ...stepDefault,
    id: 'library',
    attachTo: {element: '.tour-library', on: 'top'},
    text: ['Ваша программа основана на схема-терапии. Вы можете ознакомиться с ее принципами, а также узнать много другой полезной информации в Библиотеке'],
  },
  {
    ...stepDefault,
    id: 'consult',
    attachTo: {element: '.tour-consult', on: 'top'},
    text: ['Вы также можете получить консультацию с психологом в дополнение к вашей основной программе. Формат общения на выбор: очно или онлайн'],
  },
];

steps = steps.map((step, index) => {
  const stepButtons = [buttons.cancel];
  if (index) stepButtons.push(buttons.back);
  if (index === steps.length - 1) stepButtons.push(buttons.complete);
  else stepButtons.push(buttons.next);
  return {...step, buttons: stepButtons};
});

const tourOptions = {
  defaultStepOptions: {
    cancelIcon: {
      enabled: true
    }
  },
  useModalOverlay: true,
};

export default function Tour() {
  return (
    <ShepherdTour steps={steps} tourOptions={tourOptions}>
      <TourMethods>
        {tourContext => <TourStart tour={tourContext}/>}
      </TourMethods>
    </ShepherdTour>
  )
}