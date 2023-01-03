import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import addressService from "@src/services/addressService";
import authSlice from "@src/slices/authSlice";

const initialState = {
  address: {},
  addresses: [],
  error: false,
  success: false,
  loading: false,
  message: null,
};

// Get an adresses by cep
export const getAddressByCep = createAsyncThunk('cep/get', async (cep, thunkAPI) => {


  try {

    const res = await addressService.getAddressByCep(cep);
    return res.data;

  } catch (e) {

    // Check for errors
    return thunkAPI.rejectWithValue(e.response.data.errors[0]);

  }

});

// Get all adresses by user
export const getAddressesByUser = createAsyncThunk('address/getbyuser', async (_, thunkAPI) => {


  try {

    const token = thunkAPI.getState().auth.user.data.token;
    const res = await addressService.getAddressesByUser(token);

    return res.data;

  } catch (e) {

    if(e.response.data.errors[0].includes("Token")) {
      return authSlice.logout();
    }
    // Check for errors
    return thunkAPI.rejectWithValue(e.response.data.errors[0]);

  }

});

// Delete an address
export const deleteAnAddress = createAsyncThunk('address/delete', async (id, thunkAPI) => {


  try {

    const token = thunkAPI.getState().auth.user.data.token;
    const res = await addressService.deleteAnAddress(token, id);

    return res.data;

  } catch (e) {

    if(e.response.data.errors[0].includes("Token")) {
      return authSlice.logout();
    }
    // Check for errors
    return thunkAPI.rejectWithValue(e.response.data.errors[0]);

  }

});

// Delete an address
export const postNewAddress = createAsyncThunk('address/new', async (address, thunkAPI) => {


  try {

    const token = thunkAPI.getState().auth.user.data.token;
    const res = await addressService.postNewAddress(token, address);

    return res.data;

  } catch (e) {

    // console.log(e.response.data.errors[0]);

    // if(e.response.data.errors[0].includes("Token")) {
    //   return authSlice.logout();
    // }
    // Check for errors
    return thunkAPI.rejectWithValue(e.response.data.errors[0]);

  }

});


export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
      resetAddressStates: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = null;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAddressesByUser.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(getAddressesByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.addresses = action.payload;
      })
      .addCase(getAddressesByUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.addresses = null;
      })
      .addCase(deleteAnAddress.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
      })
      .addCase(deleteAnAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.address = action.payload;
        state.message = 'Endereço excluído com sucesso';
      })
      .addCase(deleteAnAddress.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(getAddressByCep.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
      })
      .addCase(getAddressByCep.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.address = action.payload;
      })
      .addCase(getAddressByCep.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(postNewAddress.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
      })
      .addCase(postNewAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.address = action.payload;
        state.message = 'Endereço cadastrado com sucesso';
      })
      .addCase(postNewAddress.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
  },
});

export const { resetAddressStates } = addressSlice.actions;
export default addressSlice.reducer;
