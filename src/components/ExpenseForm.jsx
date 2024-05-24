import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ExpenseForm() {
  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expenses.expenses);
  const idToken = useSelector(state => state.auth.idToken);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const response = await fetch(`https://expense-tracker-d154c-default-rtdb.firebaseio.com/expenses.json?auth=${idToken}`);

        if (!response.ok) {
          throw new Error('Failed to fetch expenses.');
        }

        const data = await response.json();
        if (data) {
          const expensesArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          dispatch({ type: 'SET_EXPENSES', payload: expensesArray });
        }
      } catch (error) {
        console.error('Error fetching expenses:', error.message);
      }
    }

    fetchExpenses();
  }, [dispatch, idToken]);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    const newExpense = {
      amount,
      description,
      category,
    };

    try {
      const response = await fetch(`https://expense-tracker-d154c-default-rtdb.firebaseio.com/expenses.json?auth=${idToken}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExpense),
      });

      if (!response.ok) {
        throw new Error('Failed to add expense.');
      }

      const data = await response.json();
      const newExpenseWithKey = { ...newExpense, id: data.name };
      dispatch({ type: 'ADD_EXPENSE', payload: newExpenseWithKey });

      setAmount('');
      setDescription('');
      setCategory('');
    } catch (error) {
      console.error('Error adding expense:', error.message);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      const response = await fetch(`https://expense-tracker-d154c-default-rtdb.firebaseio.com/expenses/${id}.json?auth=${idToken}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete expense.');
      }

      dispatch({ type: 'DELETE_EXPENSE', payload: id });
    } catch (error) {
      console.error('Error deleting expense:', error.message);
    }
  };

  const handleEditExpense = (expense) => {
    setAmount(expense.amount);
    setDescription(expense.description);
    setCategory(expense.category);
    setEditingExpense(expense);
  };

  const handleUpdateExpense = async (e) => {
    e.preventDefault();
    const updatedExpense = {
      ...editingExpense,
      amount,
      description,
      category,
    };

    try {
      const response = await fetch(`https://expense-tracker-d154c-default-rtdb.firebaseio.com/expenses/${editingExpense.id}.json?auth=${idToken}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedExpense),
      });

      if (!response.ok) {
        throw new Error('Failed to update expense.');
      }

      dispatch({ type: 'UPDATE_EXPENSE', payload: updatedExpense });

      setAmount('');
      setDescription('');
      setCategory('');
      setEditingExpense(null);
    } catch (error) {
      console.error('Error updating expense:', error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense}>
        <input
          className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
        />
        <input
          className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <select
          className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
        </select>
        <button
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          type="submit"
        >
          {editingExpense ? 'Update Expense' : 'Add Expense'}
        </button>
      </form>

      <ul>
        {expenses.map((expense) => (
          <li key={expense.id} className="flex justify-between items-center mb-2">
            <div>{expense.amount} - {expense.description} - {expense.category}</div>
            <div>
              <button className="mr-2 text-blue-500" onClick={() => handleEditExpense(expense)}>Edit</button>
              <button className="text-red-500" onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseForm;
