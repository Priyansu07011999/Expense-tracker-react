// store.js
import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import expensesReducer from './reducers/expensesReducer';
import profileReducer from './reducers/profileReducer'; // Add this line

const rootReducer = combineReducers({
  auth: authReducer,
  expenses: expensesReducer,
  profile: profileReducer, // Add this line
});

const store = createStore(rootReducer);

export default store;
