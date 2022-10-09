import axios from 'axios';
import { wordsUrl } from '../urls';

export const fetchWords = () => {
  return axios.get(wordsUrl, { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => console.log(e))
};
