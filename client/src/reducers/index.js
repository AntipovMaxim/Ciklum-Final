import { combineReducers } from 'redux';
import seat from './seat.reducer';
import person from './person.reducer';
import login from './login.reducer';


const rootReducer = combineReducers({
  seat,
  person,
  login
});

export default rootReducer;