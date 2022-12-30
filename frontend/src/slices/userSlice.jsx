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

})


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
  },
});

export const { resetUserStates } = userSlice.actions;
export default userSlice.reducer;
