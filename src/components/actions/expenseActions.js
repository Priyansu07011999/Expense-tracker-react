export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const SET_EXPENSES = 'SET_EXPENSES';

export const addExpenseSuccess = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const deleteExpenseSuccess = (id) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const setExpenses = (expenses) => ({
  type: SET_EXPENSES,
  payload: expenses,
});

export const fetchExpenses = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('/api/expenses');
      const data = await response.json();

      dispatch(setExpenses(data));
    } catch (error) {
      console.error('Failed to fetch expenses:', error);
    }
  };
};
