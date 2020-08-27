import axios from 'axios';

const bible = (key) => {
  return axios.create({
    baseURL: 'https://api.scripture.api.bible/v1/',
    headers: {
      'api-key': key,
    },
  });
}

export default bible;
