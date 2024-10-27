// src/state/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  status: boolean;
  message: string;
  token: string;
}

// Helper function to get persisted state from localStorage
const persistedAuthState = localStorage.getItem('authState')
  ? JSON.parse(localStorage.getItem('authState')!)
  : { status: false, message: '', token: '' };

const initialState: AuthState = {
  status: persistedAuthState.status || false,
  message: persistedAuthState.message || '',
  token: persistedAuthState.token || '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string; message: string }>) => {
      state.status = true;
      state.token = action.payload.token;
      state.message = action.payload.message;

      // Save auth state to localStorage
      localStorage.setItem('authState', JSON.stringify(state));
    },
    logout: (state) => {
      state.status = false;
      state.token = '';
      state.message = '';

      // Clear auth state from localStorage
      localStorage.removeItem('authState');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
