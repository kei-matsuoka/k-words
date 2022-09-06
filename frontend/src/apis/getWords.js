import axios from 'axios';

export const getWords = async (id) => {
  const url = `http://localhost:3000/cards/${id}`;
  return await axios.get(url, { withCredentials: true })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}
