import { combineReducers } from 'redux';
import authReducer from './authReducer';
import expenseReducer from './expensesReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  expenses: expenseReducer,
});

export default rootReducer;
