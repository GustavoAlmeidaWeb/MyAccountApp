import { api } from '@src/utils/config';

const register = async (data) => {

  const res = await api.post('/user/register', data);
  return res;

}

const login = async (data) => {

  const res = await api.post('/user/login', data);
  return res;

}

const logout = async () => {

  localStorage.removeItem('user_account');

}

const authService = {
  register,
  login,
  logout,
}

export default authService;
