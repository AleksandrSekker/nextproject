import { createSlice } from '@reduxjs/toolkit';
import ERROR from './types';
interface ErrorState {
  value: boolean;
}

const initialState: ErrorState = {
  value: false,
};

export const errorSlice = createSlice({
  name: ERROR,
  initialState,
  reducers: {
    errortrue: (state) => {
      state.value = true;
    },
    errorfalse: (state) => {
      state.value = false;
    },
  },
});

export default errorSlice.reducer;
