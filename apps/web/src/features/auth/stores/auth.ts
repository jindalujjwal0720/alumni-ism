import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/stores';

export interface AuthState {
  token: string | null;
  role: string | null;
  initialized: boolean;
}

const initialState: AuthState = {
  token: null,
  role: null,
  initialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken(state, action) {
      state.token = action.payload.token;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setInitialized: (state, action) => {
      state.initialized = action.payload;
    },
    clearCredentials(state) {
      state.token = null;
      state.role = null;
    },
  },
});

export const { setAccessToken, setRole, clearCredentials, setInitialized } =
  authSlice.actions;

export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectRole = (state: RootState) => state.auth.role;
export const selectIsAuthenticated = (state: RootState) => !!state.auth.token;
export const selectIsInitialized = (state: RootState) => state.auth.initialized;

export default authSlice.reducer;
