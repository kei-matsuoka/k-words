import axios from 'axios';

export const Login = (email, password, password_confirmation) => {
  const url = 'http://localhost:3000/login';
  return axios.post(url, {
    email: email,
    password: password,
    password_confirmation: password_confirmation
  },{ withCredentials: true })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
