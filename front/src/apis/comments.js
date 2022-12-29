import axios from 'axios';
import { userCommentUrl } from '../urls';

export const createComment = (user_id, word_id, text) => {
  return axios.post(userCommentUrl(user_id), {
    user_id: user_id,
    word_id: word_id,
    text: text,
  }, { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => {
    throw e;
  })
};

export const destroyComment = (comment_id) => {
  return axios.delete(userCommentUrl(comment_id), { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => {
    throw e;
  })
};

export const getCommentedWords = (id) => {
  return axios.get(userCommentUrl(id), { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => {
    throw e;
  });
};
