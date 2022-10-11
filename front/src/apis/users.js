import axios from 'axios';
import { userUrl } from '../urls';

export const patchUser = (id, name, email) => {
  return axios.patch(userUrl(id), {
    name: name,
    email: email
  }, { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => {
    console.log(e);
  });
};

export const getUserWords = (id) => {
  return axios.get(userUrl(id), { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => {
    console.log(e);
  });
};
