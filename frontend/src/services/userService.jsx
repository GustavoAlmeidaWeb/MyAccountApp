import { api, setTokenHeaders } from '@src/utils/config';

const getCurrentUser = async (token) => {
  setTokenHeaders(token);
  const data = await api.get('/user');
  return data;
}

const updateUserProfile = async (token, user) => {
  setTokenHeaders(token);
  const data = await api.put('/user/update', user);
  return data;
}

const deleteUserProfile = async (token) => {
  setTokenHeaders(token);
  const data = await api.delete('/user/delete');
  return data;
}

const userService = {
  getCurrentUser,
  updateUserProfile,
  deleteUserProfile,
};

export default userService;
