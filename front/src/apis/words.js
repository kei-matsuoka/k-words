import axios from 'axios';
import { wordsUrl, userWordsUrl, userWordUrl, favoriteWordsUrl, commentedWordsUrl } from '../urls';

export const getWords = () => {
  return axios.get(wordsUrl, { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => {
    throw e;
  })
};

export const getUserWords = () => {
  return axios.get(userWordsUrl, { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => {
    throw e;
  });
};

export const createWord = (data) => {
  return axios.post(userWordsUrl, {
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

export const getFavoriteWords = () => {
  return axios.get(favoriteWordsUrl, { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => {
    throw e;
  });
};

export const getCommentedWords = () => {
  return axios.get(commentedWordsUrl, { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => {
    throw e;
  });
};
