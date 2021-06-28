import { RootState } from '../store';
import { errorSlice } from './reducers';

export const { errortrue, errorfalse } = errorSlice.actions;
export const selectError = (state: RootState) => state.error.value;
export default errorSlice.reducer;
