// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../state/adminSlice"; 

const store = configureStore({
  reducer: {
    auth: authReducer, // Update to use authReducer from authSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
