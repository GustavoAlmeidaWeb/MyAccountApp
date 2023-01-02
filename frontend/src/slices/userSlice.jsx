import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '@src/services/userService';

const initialState = {
  user: {},
  loading: false,
  error: null,
  success: false,
  message: null,
};


export const getCurrentUser = createAsyncThunk('user/get', async (_, thunkAPI) => {

  try {

    const token = thunkAPI.getState().auth.user.data.token;
    const res = await userService.getCurrentUser(token);

    return res.data;

  } catch (e) {

    // Check for errors
    return thunkAPI.rejectWithValue(e.response.data.errors[0]);

  }

});

export const updateUserProfile = createAsyncThunk('user/update', async (userData, thunkAPI) => {

  try {

    const token = thunkAPI.getState().auth.user.data.token;
    const res = await userService.updateUserProfile(token, userData);

    return res.data;

  } catch (e) {

    // Check for errors
    return thunkAPI.rejectWithValue(e.response.data.errors[0]);

  }

});

export const deleteUserProfile = createAsyncThunk('user/delete', async (_, thunkAPI) => {

  try {

    const token = thunkAPI.getState().auth.user.data.token;
    const res = await userService.deleteUserProfile(token);

    return res.data;

  } catch (e) {

    // Check for errors
    return thunkAPI.rejectWithValue(e.response.data.errors[0]);

  }

});


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
      resetUserStates: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = null;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
        state.message = 'Perfil atualizado com sucesso.';
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(deleteUserProfile.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
      })
      .addCase(deleteUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
        state.message = 'Conta excluída com sucesso.';
      })
      .addCase(deleteUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
  },
});

export const { resetUserStates } = userSlice.actions;
export default userSlice.reducer;
