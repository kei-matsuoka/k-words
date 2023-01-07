import axios from 'axios';
import { commentsUrl, commentUrl } from '../urls';

export const createComment = (user_id, word_id, text) => {
  return axios.post(commentsUrl, {
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
  return axios.delete(commentUrl(comment_id), { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => {
    throw e;
  })
};
