import {useState, useEffect} from 'react';

const imagePath = (path) => `${process.env.PUBLIC_URL}/assets/images/${path}`
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

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

export {imagePath, usePersistedState, sleep};