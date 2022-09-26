import axios from 'axios';
import { signupUrl } from '../urls';

export default async function Signup(name, email, password) {
  const url = signupUrl;
  const user = {
    user: {
      name: name,
      email: email,
      password: password,
      password_confirmation: password
    }
  }

  return await axios.post(url, user, { withCredentials: true }
  ).then(function (response) {
    console.log(response);
    return response;
  }).catch(function (error) {
    console.log(error);
  });
}
