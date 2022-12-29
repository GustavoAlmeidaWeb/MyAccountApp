import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import accountService from '@src/services/accountService';

const initialState = {
  account: {},
  accounts: [],
  error: false,
  success: false,
  loading: false,
  message: null,
};

// Get all bank accounts by user
export const getAccountsByUser = createAsyncThunk('account/getbyuser', async (_, thunkAPI) => {


  try {

    const token = thunkAPI.getState().auth.user.data.token;
    const res = await accountService.getAccountsByUser(token);

    return res.data;

  } catch (e) {

    // Check for errors
    return thunkAPI.rejectWithValue(e.response.data.errors[0]);

  }

});

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
      resetAccountStates: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = null;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAccountsByUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
      })
      .addCase(getAccountsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.accounts = action.payload;
      })
      .addCase(getAccountsByUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.accounts = null;
      })
  },
});

export const { resetAccountStates } = accountSlice.actions;
export default accountSlice.reducer;
