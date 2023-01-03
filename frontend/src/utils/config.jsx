import axios from 'axios';

export const api_url = import.meta.env.VITE_API_URL;
export const uploads = import.meta.env.VITE_API_UPLOADS;
export const cep_url = import.meta.env.VITE_CEP_URL;

export const api = axios.create({
  baseURL: api_url,
});

export const bcode_cep = axios.create({
  baseURL: cep_url,
});

export const setTokenHeaders = (token) => {
  api.defaults.headers['Authorization'] = `Bearer ${token}`;
}
