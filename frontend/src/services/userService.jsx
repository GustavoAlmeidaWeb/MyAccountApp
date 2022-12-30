import { api, setTokenHeaders } from '@src/utils/config';

const getCurrentUser = async (token) => {
  setTokenHeaders(token);
  const data = await api.get('/user');
  return data;
}

const userService = {
  getCurrentUser,
};

export default userService;
