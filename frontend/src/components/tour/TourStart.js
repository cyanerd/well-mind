import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {completeTour} from '../../redux/app';
import eventBus from '../../EventBus';

const FORCE_START = false;

export default function TourStart({tour}) {
  const isTourCompleted = useSelector(state => state.app.isTourCompleted);
  const dispatch = useDispatch();

  ['close', 'cancel', 'complete'].forEach((event) => tour.on(event, () => {
    eventBus.dispatch('TOUR_COMPLETE');
    dispatch(completeTour());
    window.scrollTo(0, 0);
  }));

  const startTour = () => {
    eventBus.dispatch('TOUR_START');
    tour.start();
  }

  useEffect(() => {
    (!isTourCompleted || FORCE_START) && startTour();
  });

  return null;
}