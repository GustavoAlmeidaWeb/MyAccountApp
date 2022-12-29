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
        state.error = false;
      })
      .addCase(getAddressesByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.addresses = action.payload;
      })
      .addCase(getAddressesByUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.addresses = null;
      })
  },
});

export const { resetAddressStates } = addressSlice.actions;
export default addressSlice.reducer;
