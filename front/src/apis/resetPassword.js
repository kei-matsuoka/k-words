import axios from 'axios';
import { passwordUrl } from '../urls';

export const createResetToken = (email) => {
  return axios.post(passwordUrl, {email: email}, { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => { 
    console.log(e);
  });
};

export const patchPassword = (id, email, password) => {
  return axios.patch(passwordUrl, {
    id: id,
    email: email,
    password: password,
    password_confirmation: password
    }, { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => { 
    console.log(e);
  });
};
