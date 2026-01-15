import axios from 'axios';
import config from './../config/omdbapi';

const API_KEY = config.apiKey;
const BASE_URL = 'https://www.omdbapi.com/';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
});
