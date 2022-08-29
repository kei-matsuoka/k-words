import axios from 'axios';

const url = 'http://localhost:3000/login';

export const Login = async(email, password, password_confirmation) => {
  return await axios.post(url, {
    email: email,
    password: password,
    password_confirmation: password_confirmation
  },{ withCredentials: true })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

// セッションのあるユーザーを返す
export const getCurrentUser = async() => {
  return await axios.get(url,{ withCredentials: true })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}
