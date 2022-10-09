import axios from 'axios';
import { logoutUrl } from '../urls';

export const Logout = () => {
  return axios.delete(logoutUrl, { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => {
    console.log(e);
  });
};
