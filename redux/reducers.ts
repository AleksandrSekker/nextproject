import counterReducer from './counter/action';
import changeReducer from './formchange/action';
const rootReducer = {
  reducer: {
    counter: counterReducer,
    change: changeReducer,
  },
};
export default rootReducer;
