import axios from 'axios';
import { cardsUrl, cardWordUrl } from '../urls';

export const getCards = () => {
  return axios.get(cardsUrl, { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => {
    throw e;
  })
};

export const getCardWords = (card_id) => {
  return axios.get(cardWordUrl(card_id), { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => {
    throw e;
  });
};
