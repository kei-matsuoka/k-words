import axios from 'axios';
import { loginUrl } from '../urls';

export const Login = async (email, password, password_confirmation) => {
  return await axios.post(loginUrl, {
    email: email,
    password: password,
    password_confirmation: password_confirmation
  }, { withCredentials: true })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

// セッションのあるユーザーを返す
export const getCurrentUser = () => {
  return axios.get(loginUrl, { withCredentials: true })
    .then(res => {
      return res
    })
    .catch(e => {
      console.log(e);
    });
}
