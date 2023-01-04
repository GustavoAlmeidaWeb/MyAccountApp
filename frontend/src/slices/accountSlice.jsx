import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import accountService from '@src/services/accountService';

const initialState = {
  account: {},
  accounts: [],
  bank: [],
  error: false,
  success: false,
  loading: false,
  message: null,
};

// Get bank names list
export const getBankList = createAsyncThunk('bank/getlist', async (_, thunkAPI) => {

  try {

    const res = await accountService.getBankList();
    return res.data;

  } catch (e) {

    // Check for errors
    return thunkAPI.rejectWithValue(e.response.data.errors[0]);

  }

});

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

// Delete an bank account
export const deleteAnAccount = createAsyncThunk('account/delete', async (id, thunkAPI) => {

  try {

    const token = thunkAPI.getState().auth.user.data.token;
    const res = await accountService.deleteAnAccount(token, id);

    return res.data;

  } catch (e) {

    // Check for errors
    return thunkAPI.rejectWithValue(e.response.data.errors[0]);

  }

});

// Post a new bank account
export const postNewAccount = createAsyncThunk('account/post', async (accountData, thunkAPI) => {

  try {

    const token = thunkAPI.getState().auth.user.data.token;
    const res = await accountService.postNewAccount(token, accountData);

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
      })
      .addCase(getAccountsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.accounts = action.payload;
      })
      .addCase(getAccountsByUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.accounts = null;
      })
      .addCase(deleteAnAccount.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(deleteAnAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.account = action.payload;
        state.message = 'Conta bancária excluída com sucesso.';
      })
      .addCase(deleteAnAccount.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(postNewAccount.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(postNewAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.account = action.payload;
        state.message = 'Conta cadastrada com sucesso.';
      })
      .addCase(postNewAccount.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(getBankList.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(getBankList.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.bank = action.payload;
      })
      .addCase(getBankList.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
  },
});

export const { resetAccountStates } = accountSlice.actions;
export default accountSlice.reducer;
