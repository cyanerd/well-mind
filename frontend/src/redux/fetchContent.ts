import { setContent } from './app';
import api from '../Api';

export const fetchContent = () => async (dispatch) => {
  try {
    const { result } = await api.request('get_texts');
    dispatch(setContent(result));
  } catch (error) {
    console.error('Ошибка при получении контента:', error);
  }
};