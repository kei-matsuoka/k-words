import axios from 'axios';
import { userFavoriteUrl } from '../urls';

export const handleFavorite = (user_id, word_id) => {
  return axios.post(userFavoriteUrl(user_id), {
    user_id: user_id,
    word_id: word_id,
  }, { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => {
    throw e;
  })
};

export const getUserFavorites = (id) => {
  return axios.get(userFavoriteUrl(id), { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => {
    throw e;
  });
};
