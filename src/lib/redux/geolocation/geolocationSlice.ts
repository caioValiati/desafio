'use client'

import { createSlice } from '@reduxjs/toolkit';

interface GeolocationState {
  position: {
    latitude: number;
    longitude: number;
  } | null;
  mapCenter: {
    lat: number;
    lng: number;
  } | null;
}

const initialState: GeolocationState = {
  position: {
    latitude: 0,
    longitude: 0,
  },
  mapCenter: {
    lat: 0,
    lng: 0,
  }
};

const geolocationSlice = createSlice({
  name: 'geolocation',
  initialState,
  reducers: {
    setPosition(state, action) {
      state.position = action.payload;
    },
    setMapCenter(state, action) {
      state.mapCenter = action.payload;
    }
  }
});

export const { setPosition, setMapCenter } = geolocationSlice.actions

export default geolocationSlice.reducer;
