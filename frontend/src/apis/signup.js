import axios from 'axios';

export const Signup = (name, email, password, password_confirmation) => {
  const url = 'http://localhost:3000/signup';
  return axios.post(url, {
    name: name,
    email: email,
    password: password,
    password_confirmation: password_confirmation
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}
