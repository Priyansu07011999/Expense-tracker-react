import React, { useState, useEffect } from 'react';

function ExpenseForm() {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const response = await fetch('https://expense-tracker-d154c-default-rtdb.firebaseio.com/expenses.json');

        if (!response.ok) {
          throw new Error('Failed to fetch expenses.');
        }

        const data = await response.json();
        if (data) {
          const expensesArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setExpenses(expensesArray);
        }
      } catch (error) {
        console.error('Error fetching expenses:', error.message);
      }
    }

    fetchExpenses();
  }, []);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    const newExpense = {
      amount,
      description,
      category,
    };

    try {
      const response = await fetch('https://expense-tracker-d154c-default-rtdb.firebaseio.com/expenses.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExpense),
      });

      if (!response.ok) {
        throw new Error('Failed to add expense.');
      }

      
      setAmount('');
      setDescription('');
      setCategory('');

      // Fetch updated expenses list and update state
      const data = await response.json();
      const newExpenseWithKey = { ...newExpense, id: data.name }; // Adding Firebase-generated ID
      setExpenses([...expenses, newExpenseWithKey]);
    } catch (error) {
      console.error('Error adding expense:', error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl mb-4 text-center">Add Expense</h2>
      <form className="space-y-4" onSubmit={handleAddExpense}>
        <div>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>Select Category</option>
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          type="submit"
        >
          Add Expense
        </button>
      </form>
      <div className="mt-6">
        <h3 className="text-xl mb-4 text-center">Expenses</h3>
        {expenses.length > 0 ? (
          <ul className="space-y-4">
            {expenses.map((expense) => (
              <li key={expense.id} className="border-b pb-2">
                <p>Amount: ₹{expense.amount}</p>
                <p>Description: {expense.description}</p>
                <p>Category: {expense.category}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No expenses added yet.</p>
        )}
      </div>
    </div>
  );
}

export default ExpenseForm;
