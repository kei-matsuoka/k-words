import axios from 'axios';
import { contactUrl } from '../urls';

export const createContact = (data) => {
  return axios.post(contactUrl, {
    email: data.email,
    category: data.category,
    text: data.text
  }, { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => {
    throw e;
  })
};
