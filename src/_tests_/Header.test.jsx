import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from '../components/header/Header';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('Header component', () => {
  it('renders with correct links when user is logged in', () => {
    const store = mockStore({
      auth: { isLoggedIn: true },
      expenses: { totalAmount: 5000 } // Mock totalAmount
    });

    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    assert.ok(getByText('Home'));
    assert.ok(getByText('Profile'));
    assert.ok(getByText('Logout'));
    assert.ok(getByText('ExpenseTracker'));
  });

  it('renders with correct links when user is logged out', () => {
    const store = mockStore({
      auth: { isLoggedIn: false },
      expenses: { totalAmount: 5000 } // Mock totalAmount
    });

    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    assert.ok(getByText('Home'));
    assert.ok(getByText('Login'));
    assert.ok(getByText('ExpenseTracker'));
  });

  it('displays "Buy Premium" button when totalAmount > 10000', () => {
    const store = mockStore({
      auth: { isLoggedIn: true },
      expenses: { totalAmount: 15000 } // Mock totalAmount greater than 10000
    });

    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    assert.ok(getByText('Buy Premium'));
  });

  it('calls logout function when "Logout" button is clicked', () => {
    const mockLogout = () => {};

    const store = mockStore({
      auth: { isLoggedIn: true },
      expenses: { totalAmount: 5000 } // Mock totalAmount
    });

    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <Header logout={mockLogout} />
        </Router>
      </Provider>
    );

    fireEvent.click(getByText('Logout'));
    // Add assertion for the logout function call
  });
});
