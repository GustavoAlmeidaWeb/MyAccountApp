import axios from 'axios';

export const api_url = import.meta.env.VITE_API_URL;
export const uploads = import.meta.env.VITE_API_UPLOADS;

export const setTokenHeaders = (token) => {
  axios.defaults.headers['Authorization'] = `Bearer ${token}`;
}

export const api = axios.create({
  baseURL: api_url,
})
