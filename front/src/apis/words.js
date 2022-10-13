import axios from 'axios';
import { wordsUrl, userWordUrl } from '../urls';

export const getWords = () => {
  return axios.get(wordsUrl, { withCredentials: true }
  ).then(res => {
    return res
  }).catch(e => console.log(e))
};

export const createWord = (data) => {
  return axios.post(wordsUrl,{ 
    title: data.title,
    kana: data.kana,
    meaning: data.meaning,
    text: data.text
   }, { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => console.log(e))
};

export const patchWord = (data, word_id) => {
  return axios.patch(userWordUrl(word_id),{ 
    title: data.title,
    kana: data.kana,
    meaning: data.meaning,
    text: data.text
   }, { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => console.log(e))
};

export const destroyWord = (id) => {
  return axios.delete(userWordUrl(id), { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => console.log(e))
};
