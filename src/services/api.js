import axios from 'axios';

const api = axios.create({
  baseURL: 'http://54.209.213.172/api/v1/public/'
});

export default api;