// App.js
import React, { useState, useEffect } from 'react';
import SignupForm from './components/SignupForm';
import ProfileUpdatePage from './components/ProfileUpdate';
import Header from './components/header/Header';
import ForgotPasswordForm from './components/ForgetPassword';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [showProfileUpdate, setShowProfileUpdate] = useState(false);
  const [idToken, setIdToken] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    // Check if user is logged in on component mount
    const token = localStorage.getItem('idToken');
    if (token) {
      setIsLoggedIn(true);
      setIdToken(token);
      fetchProfileData(token);
    }
  }, []);

  const handleLoginSuccess = (token) => {
    localStorage.setItem('idToken', token);
    setIdToken(token);
    setIsLoggedIn(true);
    setIsEmailVerified(false);
    fetchProfileData(token);
  };

  const handleLogout = () => {
    // Clear idToken from local storage and reset state
    localStorage.removeItem('idToken');
    setIsLoggedIn(false);
    setIdToken('');
    setProfileData(null);
    setIsEmailVerified(false);
  };

  const handleProfileCompletion = (status) => {
    setIsProfileComplete(status);
  };

  const handleCompleteProfile = () => {
    setShowProfileUpdate(true);
  };

  const handleCancelProfileUpdate = () => {
    setShowProfileUpdate(false);
  };

  const fetchProfileData = async (token) => {
    try {
      const response = await fetch(`https://expense-tracker-d154c-default-rtdb.firebaseio.com/users.json?auth=${token}`);
      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }
      const data = await response.json();
      setProfileData(data);
      setIsProfileComplete(!!(data?.fullName && data?.profilePhotoURL));
    } catch (error) {
      console.error('Error fetching profile data:', error.message);
    }
  };

  const handleVerifyEmail = async () => {
    try {
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestType: 'VERIFY_EMAIL',
          idToken: idToken,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send verification email');
      }

      console.log('Verification email sent successfully');
      setIsEmailVerified(true);
    } catch (error) {
      console.error('Error sending verification email:', error.message);
    }
  };

  return (
    <Router>
      <div>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Switch>
          <Route path="/login">
            {isLoggedIn ? <Redirect to="/" /> : <SignupForm onLoginSuccess={handleLoginSuccess} onProfileCompletion={handleProfileCompletion} />}
          </Route>
          <Route path="/forgot-password">
            <ForgotPasswordForm />
          </Route>
          <Route path="/">
            {isLoggedIn ? (
              <div>
                <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                  <h1 className="text-3xl mb-4 text-center">Welcome to Expense Tracker!!!</h1>
                  {!isProfileComplete ? (
                    <div className="text-center">
                      <p className="text-red-500">Your profile is incomplete.</p>
                      <button className="text-blue-500 underline" onClick={handleCompleteProfile}>
                        Complete now
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      {isEmailVerified ? (
                        <p className="text-green-500">Verification Link sent. Check your email</p>
                      ) : (
                        <button
                          className="w-full px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                          onClick={handleVerifyEmail}
                        >
                          Verify Email
                        </button>
                      )}
                      {profileData?.fullName && profileData?.profilePhotoURL && <p className="text-green-500">Your profile is 100% complete.</p>}
                    </div>
                  )}
                </div>
                {showProfileUpdate ? (
                  <ProfileUpdatePage
                    onCancel={handleCancelProfileUpdate}
                    idToken={idToken}
                    onProfileCompletion={handleProfileCompletion}
                  />
                ) : null}
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
