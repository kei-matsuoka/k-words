import axios from 'axios';
import { wordsUrl, userWordUrl } from '../urls';

export const getWords = () => {
  return axios.get(wordsUrl, { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => {
    throw e;
  })
};

export const getUserWords = (user_id) => {
  return axios.get(userWordUrl(user_id), { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => {
    throw e;
  });
};

export const createWord = (data, user_id) => {
  return axios.post(userWordUrl(user_id), {
    title: data.title,
    kana: data.kana,
    meaning: data.meaning,
    text: data.text
  }, { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => {
    throw e;
  })
};

export const patchWord = (data, word_id) => {
  return axios.patch(userWordUrl(word_id), {
    title: data.title,
    kana: data.kana,
    meaning: data.meaning,
    text: data.text
  }, { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => {
    throw e;
  })
};

export const destroyWord = (word_id) => {
  return axios.delete(userWordUrl(word_id), { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => {
    throw e;
  })
};
