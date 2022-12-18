import axios from 'axios';
import { cardsUrl, cardUrl } from '../urls';

export const getCards = () => {
  return axios.get(cardsUrl, { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => {
    throw e;
  })
};

export const getCardWords = (id) => {
  return axios.get(cardUrl(id), { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => {
    throw e;
  });
};
