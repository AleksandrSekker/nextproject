import { RootState } from '../store';
import { loadSlice } from './reducers';

export const { loadtrue, loadfalse } = loadSlice.actions;
export const selectLoad = (state: RootState) => state.load.value;
export default loadSlice.reducer;
