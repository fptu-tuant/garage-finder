import axios from 'axios';

import { ACCESS_TOKEN_KEY } from '@/constants';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    ACCESS_TOKEN_KEY
  )}`;

  return config;
}, Promise.reject);

export { api };
