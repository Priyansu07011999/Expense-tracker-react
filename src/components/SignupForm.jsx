import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import ForgotPasswordForm from './ForgetPassword'; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; 

function SignupForm({ onLoginSuccess, onForgotPassword }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false); 

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      setError('Your password and Confirm Password do not match. Please check and try again.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User has successfully signed up');
      onLoginSuccess(userCredential.user.uid);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User has successfully logged in');
      onLoginSuccess(userCredential.user.uid);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleForgotPassword = async (resetEmail) => {
    try {
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: resetEmail,
          requestType: 'PASSWORD_RESET',
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error.message);
      }

      console.log('Password reset email sent. Please check your inbox.')
    }catch (error) {
      setError(error.message);
    }
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true); 
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl mb-4 text-center">{isLogin ? 'Login' : 'Sign Up'}</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {showForgotPassword ? (
        <ForgotPasswordForm
          onCancel={() => setShowForgotPassword(false)}
          onResetPassword={handleForgotPassword}
        /> 
      ) : (
        <form className="space-y-4" onSubmit={isLogin ? handleLogin : handleSignup}>
          <div>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {!isLogin && (
            <div>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
                required
              />
            </div>
          )}
          <button
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            type="submit"
          >
            {isLogin ? 'Login' : 'Sign up'}
          </button>
        </form>
      )}
      {isLogin ? (
        <p className="mt-4 text-center pt-2 text-blue-400">
          <button onClick={handleForgotPasswordClick}><i>Forgot password</i></button>
        </p>
      ) : ''}
      <p className="mt-4 text-center border-t-2 pt-4">
        {isLogin ? "Don't have an account? " : "Have an account? "}
        <button
          className="text-blue-500"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Sign up' : 'Login'}
        </button>
      </p>
    </div>
  );
}

export default SignupForm;
