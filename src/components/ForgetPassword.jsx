import React, { useState } from 'react';

function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const API_KEY = 'AIzaSyCSdVu37gW4_F5rPobNhiyNQESemMPi568'; // Your Firebase API key

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          requestType: 'PASSWORD_RESET',
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error.message);
      }

      setSuccessMessage('Password reset email sent. Please check your inbox.');
      setEmail('');
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl mb-4 text-center">Forgot Password</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      <form className="space-y-4" onSubmit={handleResetPassword}>
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
        <button
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          type="submit"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}

export default ForgotPasswordForm;
