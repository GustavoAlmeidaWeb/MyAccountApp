import { api, setTokenHeaders } from '@src/utils/config';

const getAccountsByUser = async (token) => {
  setTokenHeaders(token);
  const data = await api.get('/bank');
  return data;
}

const accountService = {
  getAccountsByUser
};

export default accountService;
