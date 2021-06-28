import changeReducer from './formchange/action';
import loadReducer from './load/action';
import errorReducer from './error/action';
const rootReducer = {
  reducer: {
    change: changeReducer,
    load: loadReducer,
    error: errorReducer,
  },
};
export default rootReducer;
