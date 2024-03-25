'use client'

import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { Cooperado } from '@/schemas/cooperado.schema';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface CooperadoState {
  cooperados: Cooperado[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: CooperadoState = {
  cooperados: null,
  loading: false,
  error: null,
};

export const getDetailedCooperado = createAsyncThunk<any, string>(
  'cooperados/getDetailedCooperado',
  async (IdCooperado: string) => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.GET_DETAILED_COOPERADO}/${IdCooperado}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error || 'Get failed');
    }
  }
);

export const getCooperados = createAsyncThunk<any>(
  'cooperados/getCooperados',
  async () => {
    try {
      const response = await axios.get(
        API_ENDPOINTS.GET_COOPERADOS
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error || 'Get failed');
    }
  }
);

const cooperadosSlice = createSlice({
  name: 'cooperados',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCooperados.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCooperados.fulfilled, (state, action) => {
        state.loading = false;
        state.cooperados = action.payload;
        state.error = null;
      })
      .addCase(getCooperados.rejected, (state, action) => {
        state.cooperados = [];
        state.loading = false;
        state.error = action.error.message || 'Get failed';
      })
      .addCase(getDetailedCooperado.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDetailedCooperado.fulfilled, (state, action) => {
        state.loading = false;
        state.cooperados = action.payload;
        state.error = null;
      })
      .addCase(getDetailedCooperado.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Get failed';
      })
  },
});

export default cooperadosSlice.reducer;
