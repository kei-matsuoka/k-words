import axios from 'axios';

const url = 'http://localhost:3000/logout';

export const Logout = async() => {
  return await axios.delete(url, { withCredentials: true })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}
