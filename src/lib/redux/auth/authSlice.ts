'use client'

import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { User } from '@/schemas/login.schema';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const userLogin = createAsyncThunk<any, User>(
  'auth/userLogin',
  async (user: User) => {
    try {
      const response = await axios.post(
        API_ENDPOINTS.LOGIN, user
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error || 'Login failed');
    }
  }
);

export const userLogout = createAsyncThunk<any, void>(
  'auth/userLogout',
  async () => {
    try {
      const response = await axios.post(
        API_ENDPOINTS.LOGOUT
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error || 'Logout failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(userLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Logout failed';
      });;
  },
});

export default authSlice.reducer;
