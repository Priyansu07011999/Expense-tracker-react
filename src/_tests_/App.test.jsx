import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from '../App';

const mockStore = configureStore([]);

describe('App Component', () => {
  let store;
  let history;

  beforeEach(() => {
    store = mockStore({
      auth: {
        isLoggedIn: true,
        idToken: 'some-token',
      },
      expenses: {
        expenses: [{ id: 1, amount: '1200', description: 'test expense' }],
      },
    });
    history = createMemoryHistory();
  });

  test('downloads expenses as CSV', async () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );

    await waitFor(() => expect(screen.getByText(/Welcome to Expense Tracker/i)).toBeInTheDocument());

    const downloadButton = screen.getByText(/Download Expenses/i);
    
    // Mocking URL.createObjectURL
    const createObjectURLMock = () => 'blob:http://localhost:3000/some-blob-url';
    global.URL.createObjectURL = createObjectURLMock;

    fireEvent.click(downloadButton);

    expect(global.URL.createObjectURL()).toBe('blob:http://localhost:3000/some-blob-url');
  });
});
