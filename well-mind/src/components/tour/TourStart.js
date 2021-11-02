import {useEffect} from 'react';

export default function TourStart({startTour}) {
  useEffect(() => {
    false && startTour.start();
  });

  return null;
}