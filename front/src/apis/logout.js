import axios from 'axios';
import { logoutUrl } from '../urls';

const url = logoutUrl;

export const Logout = async() => {
  return await axios.delete(url, { withCredentials: true })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}
