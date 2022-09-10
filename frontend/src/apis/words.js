import axios from 'axios';
import { wordsUrl } from '../urls';

export const fetchWords = (id) => {
  return axios.get(wordsUrl(id), { withCredentials: true })
    .then(res => {
      return res.data;
    })
    .catch(e => console.log(e))
}
