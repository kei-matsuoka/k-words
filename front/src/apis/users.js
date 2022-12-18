import axios from 'axios';
import { userUrl } from '../urls';

export const patchUser = (id, data) => {
  return axios.patch(userUrl(id), {
    name: data.name,
    email: data.email
  }, { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => {
    throw e;
  });
};

export const destroyUser = (id) => {
  return axios.delete(userUrl(id), { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => {
    throw e;
  });
};

export const getUserWords = (id) => {
  return axios.get(userUrl(id), { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => {
    throw e;
  });
};
