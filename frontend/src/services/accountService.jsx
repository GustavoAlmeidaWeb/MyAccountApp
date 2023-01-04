import { api, bank, setTokenHeaders } from '@src/utils/config';

const getBankList = async () => {
  const data = await bank.get();
  return data;
}

const getAccountsByUser = async (token) => {
  setTokenHeaders(token);
  const data = await api.get('/bank');
  return data;
}

const deleteAnAccount = async (token, id) => {
  setTokenHeaders(token);
  const data = await api.delete(`/bank/delete/${id}`);
  return data;
}

const postNewAccount = async (token, accountData) => {
  setTokenHeaders(token);
  const data = await api.post('/bank/newaccount', accountData);
  return data;
}

const accountService = {
  getBankList,
  getAccountsByUser,
  deleteAnAccount,
  postNewAccount
};

export default accountService;
