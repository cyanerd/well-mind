import {useState, useEffect} from 'react';
import axios from 'axios';

const baseURL = 'https://meal-deal.ru';
const axiosInstance = axios.create();

const request = async (action, params) => {
  try {
    return (await axiosInstance.post(
      baseURL + '/api.php?action=' + action,
      params
    )).data;
  } catch (error) {
    console.log(error);
  }
}

const useAxios = (action, params) => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async (action, params) => {
    try {
      const result = await axiosInstance.post(
        baseURL + '/api.php?action=' + action,
        params
      );
      setResponse(result.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(action, params);
  }, [action, params]);

  return {response, error, loading};
};

const api = { useAxios, request };

export default api;