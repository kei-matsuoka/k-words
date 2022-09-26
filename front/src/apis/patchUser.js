import axios from 'axios';
import { userUrl } from '../urls';

export default async function patchUser(id, name, email) {
  const url = userUrl(id);
  const user = {
    name: name,
    email: email,
  }

  return await axios.patch(url, user, { withCredentials: true }
  ).then(function (response) {
    console.log(response);
    return response;
  }).catch(function (error) {
    console.log(error);
  });
}
