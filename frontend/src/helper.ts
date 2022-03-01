import {useState, useEffect, useRef} from 'react';
import {Settings as IReactSlickSettings} from 'react-slick';
const mobileBreakpoint = 1200;

const imagePath = (path: string, fromServer: boolean = false) => fromServer
  ? 'https://well-mind.ru' + path
  : `${process.env.PUBLIC_URL}/assets/images/${path}`
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const shuffleArray = (array: any[]) => array.sort(() => 0.5 - Math.random());
const getURLParamValue = (key: string) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  return params[key];
}

function usePersistedState(key: string, defaultValue: any) {
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
  centerMode: true,
  centerPadding: '50px',
  adaptiveHeight: true,
  responsive: [
    {
      breakpoint: mobileBreakpoint,
    },
    {
      breakpoint: 10000,
      settings: 'unslick'
    }
  ]
} as IReactSlickSettings;

function useInterval(callback: Function, trigger: any) {
  const savedCallback = useRef();

  useEffect(() => {
    // @ts-ignore todo & review: remove
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      // @ts-ignore todo & review: remove
      savedCallback.current();
    }

    let id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [trigger]);
}

const declOfNum = (number: number, titles: string[]) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export {
  imagePath,
  usePersistedState,
  sleep,
  shuffleArray,
  sliderSettings,
  getURLParamValue,
  useInterval,
  declOfNum,
  validateEmail,
  mobileBreakpoint
};