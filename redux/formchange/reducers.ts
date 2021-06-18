import { createSlice } from '@reduxjs/toolkit';
import CHANGE from './types';
interface ChangeState {
  value: boolean;
}

const initialState: ChangeState = {
  value: true,
};

export const changeSlice = createSlice({
  name: CHANGE,
  initialState,
  reducers: {
    changevalue: (state) => {
      state.value = !state.value;
    },
  },
});

export default changeSlice.reducer;
