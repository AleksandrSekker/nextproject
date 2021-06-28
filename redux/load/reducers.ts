import { createSlice } from '@reduxjs/toolkit';
import LOAD from './types';
interface LoadState {
  value: boolean;
}

const initialState: LoadState = {
  value: false,
};

export const loadSlice = createSlice({
  name: LOAD,
  initialState,
  reducers: {
    loadtrue: (state) => {
      state.value = true;
    },
    loadfalse: (state) => {
      state.value = false;
    },
  },
});

export default loadSlice.reducer;
