import { api, bcode_cep, setTokenHeaders } from '@src/utils/config';

// get address data by cep
const getAddressByCep = async (cep) => {
  const data = await bcode_cep.get(`/${cep}`);
  return data;
}

const getAddressesByUser = async (token) => {
  setTokenHeaders(token);
  const data = await api.get('/address');
  return data;
}

const postNewAddress = async (token, address) => {
  setTokenHeaders(token);
  const data = await api.post('/address/register', address);
  return data;
}

const deleteAnAddress = async (token, id) => {
  setTokenHeaders(token);
  const data = await api.delete(`/address/delete/${id}`);
  return data;
}

const addressService = {
  getAddressesByUser,
  deleteAnAddress,
  getAddressByCep,
  postNewAddress,
}

export default addressService;
