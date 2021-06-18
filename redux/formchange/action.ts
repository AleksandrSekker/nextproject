import { RootState } from '../store';
import { changeSlice } from './reducers';

export const { changevalue } = changeSlice.actions;
export const selectChange = (state: RootState) => state.change.value;
export default changeSlice.reducer;
