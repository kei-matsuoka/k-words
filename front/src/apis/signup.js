import axios from 'axios';
import { signupUrl } from '../urls';

export const Signup = (name, email, password) => {
  return axios.post(signupUrl, {
    user: {
      name: name,
      email: email,
      password: password,
      password_confirmation: password
    }
  }, { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch(e => {
    console.log(e);
  });
};
