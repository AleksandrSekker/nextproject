import { RootState } from '../store';
import { counterSlice } from './reducers';

export const { increment, decrement, clear } = counterSlice.actions;
export const selectCount = (state: RootState) => state.counter.value;
export default counterSlice.reducer;
