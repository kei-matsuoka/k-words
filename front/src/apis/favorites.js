import axios from 'axios';
import { favoriteUrl } from '../urls';

export const handleFavorite = (user_id, word_id) => {
  return axios.post(favoriteUrl, {
    user_id: user_id,
    word_id: word_id,
  }, { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => {
    throw e;
  })
};
