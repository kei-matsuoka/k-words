import axios from 'axios';
import { userUrl } from '../urls';

export default async function patchPassword(id, password) {
  const url = userUrl(id);
  const user = {
    user: {
    password: password,
    password_confirmation: password
  }
}

return await axios.patch(url, user, { withCredentials: true }
).then(function (response) {
  console.log(response);
  return response;
}).catch(function (error) {
  console.log(error);
});
}
