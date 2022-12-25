import axios from 'axios';
import { loginUrl } from '../urls';

export const getCurrentUser = () => {
  return axios.get(loginUrl, { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => {
    throw e;
  });
};

export const Login = (email, password, remember_me) => {
  return axios.post(loginUrl, {
    email: email,
    password: password,
    remember_me: remember_me
  }, { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => {
    throw e;
  });
};
