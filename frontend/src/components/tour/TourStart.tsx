import {useSelector, useDispatch} from 'react-redux';
import React, {useEffect} from 'react';
import {completeTour} from '../../redux/app';
import eventBus from '../../EventBus';
import {Tour} from 'react-shepherd';
import {RootState} from '../../redux/store';

const FORCE_START = false;

interface ITourStartProps {
  tour: Tour
}

const TourStart: React.FC<ITourStartProps> = ({tour}) => {
  const isTourCompleted = useSelector((state: RootState) => state.app.isTourCompleted);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default TourStart;