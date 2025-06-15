import {useState, useEffect} from 'react';
import axios from 'axios';
import qs from 'qs';
import {useSelector} from 'react-redux';
import store, {RootState} from './redux/store';

const baseURL = 'https://well-mind.ru';
const axiosInstance = axios.create();

const log = (data: object) => {
  console.log({ request: data });
}

const doRequest = async (action: string, params: object, user: any) => { // todo + review: any - bad
  if (action === 'get_tele2_number') {
    return (await axiosInstance.post('http://well-mind.ru/__promo/index.php')).data;
  }

  const response = (await axiosInstance.post(
    baseURL + '/api/api.php?action=' + action,
    qs.stringify(params),
    (user?.login && user?.token ? {
      headers: {
        'X-USER-LOGIN': user?.login,
        'X-USER-TOKEN': user?.token,
      }
    } : {})
  )).data;
  log({action, params, user, response}); // logging every request
  return response;
}

const request = async (action: string, params: object = {}) => {
  const user = store.getState().app.user;
  try {
    return doRequest(action, params, user);
  } catch (error) {
    console.error(error);
  }
}

// todo + review: action & params to special type
const useAxios = <T>(action: string, params: object = {}): T => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.app.user);

  useEffect(() => {
    const fetchData = async (action: string, params: object) => {
      try {
        setResponse(await doRequest(action, params, user));
      } catch (error) {
        setError(error as string); // review: why so?
      } finally {
        setLoading(false);
      }
    };

    fetchData(action, params);
    // review
    // нельзя добавлять params в массив, потому что тогда useEffect будет прокать бесконечно
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action, user]);

  return {response, error, loading} as any; // todo & review - any
};

const api = {useAxios, request};

export default api;
