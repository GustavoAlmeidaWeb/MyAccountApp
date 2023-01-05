import { api, setTokenHeaders } from '@src/utils/config';

// Get all data by user logged
const getCurrentUser = async (token) => {
  setTokenHeaders(token);
  const data = await api.get('/user');
  return data;
}

// Update profile by user
const updateUserProfile = async (token, user) => {
  setTokenHeaders(token);
  const data = await api.put('/user/update', user);
  return data;
}

// Delete user account
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
