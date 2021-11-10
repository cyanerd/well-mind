import {useState, useEffect} from 'react';

const imagePath = (path) => `${process.env.PUBLIC_URL}/assets/images/${path}`
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
const shuffleArray = array => array.sort(() => 0.5 - Math.random()).splice(0, 3);
const getURLParamValue = (key) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  return params[key];
}

function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state === undefined ? null : state));
  }, [key, state]);
  return [state, setState];
}

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  adaptiveHeight: true,
  responsive: [
    {
      breakpoint: 1200,
    },
    {
      breakpoint: 10000,
      settings: 'unslick'
    }
  ]
};

export {imagePath, usePersistedState, sleep, shuffleArray, sliderSettings, getURLParamValue};