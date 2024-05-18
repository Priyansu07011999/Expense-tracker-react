import React, { useState } from 'react';

function SignupForm({ onLoginSuccess}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  const ID = 'AIzaSyCSdVu37gW4_F5rPobNhiyNQESemMPi568';

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      setError('Your password and Confirm Password do not match. Please check and try again.');
      return;
    }

    try {
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error.message);
      }

      const data = await response.json();
      console.log('User has successfully signed up');
      onLoginSuccess(data.idToken);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error.message);
      }

      const data = await response.json();
      console.log('User has successfully logged in');
      onLoginSuccess(data.idToken); // Call the callback with the idToken
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl mb-4 text-center">{isLogin ? 'Login' : 'Sign Up'}</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
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
      {isLogin ? (
        <p className="mt-4 text-center pt-2 text-blue-400">
          <a className="underline" href="">Forgot password</a>
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
