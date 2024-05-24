import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import ProfileUpdatePage from './components/ProfileUpdate';
import Header from './components/header/Header';
import ForgotPasswordForm from './components/ForgetPassword';
import ExpenseForm from './components/ExpenseForm';
import { auth } from './firebase'; // Import the auth instance from firebase.js

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const idToken = useSelector(state => state.auth.idToken);
  const expenses = useSelector(state => state.expenses.expenses);

  useEffect(() => {
    // Add Firebase Authentication listener to check user authentication state
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        dispatch({
          type: 'LOGIN',
          payload: { idToken: user.getIdToken(), userId: user.uid }
        });
      } else {
        // User is signed out.
        dispatch({ type: 'LOGOUT' });
      }
    });

    // Clean up the listener when the component unmounts
    return unsubscribe;
  }, [dispatch]);

  const handleLoginSuccess = (token, userId) => {
    localStorage.setItem('idToken', token);
    dispatch({
      type: 'LOGIN',
      payload: { idToken: token, userId: userId },
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('idToken');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <Router>
      <div>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Switch>
          <Route path="/login">
            {isLoggedIn ? <Redirect to="/" /> : <SignupForm onLoginSuccess={handleLoginSuccess} />}
          </Route>
          <Route path="/forgot-password">
            <ForgotPasswordForm />
          </Route>
          <Route path="/">
            {isLoggedIn ? (
              <div>
                <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                  <h1 className="text-3xl mb-4 text-center">Welcome to Expense Tracker!!!</h1>
                  {expenses.length > 0 && expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0) > 1000 && (
                    <button className="w-full px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600">
                      Activate Premium
                    </button>
                  )}
                </div>
                <ExpenseForm />
              </div>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
