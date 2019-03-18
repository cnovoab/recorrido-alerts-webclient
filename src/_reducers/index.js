import { combineReducers } from 'redux';

import { authentication } from './auth.reducer';
import { reminder } from './reminder.reducer';


const rootReducer = combineReducers({
  authentication,
  reminder
});

export default rootReducer;
