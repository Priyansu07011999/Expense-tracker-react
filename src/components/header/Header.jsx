// components/Header.js
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../actions/authActions';
import { NavLink } from 'react-router-dom';

function Header({ isLoggedIn, logout, totalAmount }) {
  const history = useHistory();

  const handleLogout = () => {
    logout();
    localStorage.removeItem('idToken');
    history.push('/login');
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 text-black">
      <div className="flex items-center">
        <NavLink to="/" className="text-lg text-blue-500 font-semibold">ExpenseTracker</NavLink>
      </div>
      <nav className="flex">
        <NavLink to="/" className="mx-2">Home</NavLink>
        <NavLink to="/profile" className="mx-2">Profile</NavLink>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="text-blue-200 hover:text-cyan-500">Logout</button>
        ) : (
          <NavLink to="/login" className="mx-2">Login</NavLink>
        )}
      </nav>
      {totalAmount > 10000 && (
        <NavLink to="/premium">
          <button className="bg-yellow-500 px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none">
            Buy Premium
          </button>
        </NavLink>
      )}
    </header>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  totalAmount: state.expenses.totalAmount,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
