import { api, setTokenHeaders } from '@src/utils/config';

const getAddressesByUser = async (token) => {
  setTokenHeaders(token);
  const data = await api.get('/address');
  return data;
}

const addressService = {
  getAddressesByUser,
}

export default addressService;
