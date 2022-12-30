import { configureStore } from '@reduxjs/toolkit';

import userSlice from '@src/slices/userSlice';
import authReducer from '@src/slices/authSlice';
import addressSlice from '@src/slices/addressSlice';
import accountSlice from '@src/slices/accountSlice';

export const store = configureStore({
    reducer: {
      user: userSlice,
      auth: authReducer,
      address: addressSlice,
      account: accountSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    }),
});
