import { createSlice } from '@reduxjs/toolkit';
import COUNTER from './types';
interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: COUNTER,
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      if (state.value >= 0) {
        state.value -= 1;
      }
    },
    clear: (state) => {
      state.value = 0;
    },
  },
});

export default counterSlice.reducer;
