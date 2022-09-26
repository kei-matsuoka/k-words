import axios from 'axios';
import { wordsUrl, allWordsUrl } from '../urls';

export const fetchWords = (id) => {
  return axios.get(wordsUrl(id), { withCredentials: true })
    .then(res => {
      return res.data;
    })
    .catch(e => console.log(e))
}

export const fetchAllWords = () => {
  return axios.get(allWordsUrl, { withCredentials: true })
    .then(res => {
      return res.data;
    })
    .catch(e => console.log(e))
}
