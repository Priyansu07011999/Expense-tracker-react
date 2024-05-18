import React, { useState, useEffect } from 'react';
import SignupForm from './components/SignupForm';
import ProfileUpdatePage from './components/ProfileUpdate'
import Header from './components/header/Header'
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [showProfileUpdate, setShowProfileUpdate] = useState(false);
  const [idToken, setIdToken] = useState(''); 
  const [profileData, setProfileData] = useState(null);

  const handleLoginSuccess = (token) => {
    setIdToken(token); 
    setIsLoggedIn(true);
    fetchProfileData(token); 
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
      setIsProfileComplete(data?.profileCompletion === '100%');
    } catch (error) {
      console.error('Error fetching profile data:', error.message);
    }
  };

  useEffect(() => {
    if (idToken) {
      fetchProfileData(idToken);
    }
  }, [idToken]);

  if (showProfileUpdate) {
    return <ProfileUpdatePage onCancel={handleCancelProfileUpdate} idToken={idToken} onProfileCompletion={handleProfileCompletion} />;
  }

  return (
    <Router>
    <div>
      <Header />
      {isLoggedIn ? (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl mb-4 text-center">Welcome to Expense Tracker!!!</h1>
          {!isProfileComplete ? (
            <div className="text-center">
              <p className="text-red-500">Your profile is incomplete.</p>
              <button
                className="text-blue-500 underline"
                onClick={handleCompleteProfile}
              >
                Complete now
              </button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-green-500">Your profile is 100% complete.</p>
            </div>
          )}
        </div>
      ) : (
        <SignupForm onLoginSuccess={handleLoginSuccess} onProfileCompletion={handleProfileCompletion} />
      )}
    </div>
    </Router>
  );
}

export default App;
