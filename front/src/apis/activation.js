import axios from 'axios';
import { activationUrl } from '../urls';

export const patchActivation = (id, email) => {
  return axios.patch(activationUrl, {
    id: id,
    email: email,
  }, { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => {
    throw e;
  });
};
