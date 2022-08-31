import axios from 'axios';

export default async function Signup(name, email, password, password_confirmation) {
  const url = 'http://localhost:3000/signup';
  const user = {
    name: name,
    email: email,
    password: password,
    password_confirmation: password_confirmation
  }

  return await axios.post(url, user, { withCredentials: true }
  ).then(function (response) {
    console.log(response);
    return response;
  }).catch(function (error) {
    console.log(error);
  });
}
