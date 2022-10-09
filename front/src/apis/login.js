import axios from 'axios';
import { loginUrl } from '../urls';

export const Login = async (email, password, remember_me) => {
  return await axios.post(loginUrl, {
    email: email,
    password: password,
    remember_me: remember_me
  }, { withCredentials: true })
    .then(res => {
      return res.data
    })
    .catch((e)=> {
      console.log(e);
    });
}

// セッションのあるユーザーを返す
export const getCurrentUser = () => {
  return axios.get(loginUrl, { withCredentials: true })
    .then(res => {
      return res.data
    })
    .catch(e => {
      console.log(e);
    });
}
