import {useState, useEffect} from 'react';
import axios from 'axios';
import qs from 'qs';
import {useSelector} from 'react-redux';
import store from './redux/store';

// const baseURL = 'https://meal-deal.ru';
const baseURL = 'http://well-mind.ru';
const axiosInstance = axios.create();

const doRequest = async (action, params, user) => {
  return (await axiosInstance.post(
    baseURL + '/api.php?action=' + action,
    qs.stringify(params),
    (user?.login && user?.token ? {
      headers: {
        'X-USER-LOGIN': user?.login,
        'X-USER-TOKEN': user?.token,
      }
    } : {})
  )).data;
}

const request = async (action, params) => {
  const user = store.getState().app.user;
  try {
    return doRequest(action, params, user);
  } catch (error) {
    console.log(error);
  }
}

const useAxios = (action, params) => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [user] = useSelector(state => state.app.user);

  useEffect(() => {
    const fetchData = async (action, params) => {
      try {
        setResponse(doRequest(action, params, user));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(action, params);
  }, [action, params, user]);

  return {response, error, loading};
};

const api = {useAxios, request};

export default api;