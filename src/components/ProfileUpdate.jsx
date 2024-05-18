import React, { useState, useEffect } from 'react';

function ProfileUpdatePage({ onCancel, idToken, onProfileCompletion }) {
  const [fullName, setFullName] = useState('');
  const [profilePhotoURL, setProfilePhotoURL] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const firebaseDatabaseURL = 'https://expense-tracker-d154c-default-rtdb.firebaseio.com/users';

  const API_KEY = 'my_api_key';

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await fetch(`https://your-database-url/users/${idToken}.json`);

      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }

      const data = await response.json();
      setFullName(data.fullName || '');
      setProfilePhotoURL(data.profilePhotoURL || '');
    } catch (error) {
      console.error('Error fetching profile data:', error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const profileCompletion = fullName && profilePhotoURL ? '100%' : '65%';
      const response = await fetch(`${firebaseDatabaseURL}.json?auth=${idToken}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          profilePhotoURL,
          profileCompletion,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      console.log('Profile updated successfully');
      setProfileData({ fullName, profilePhotoURL, profileCompletion });
      onProfileCompletion(profileCompletion === '100%'); 
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };
  

  const handleSendVerificationEmail = async () => {
    try {

      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`, {
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


      setVerificationSent(true);
    } catch (error) {
      console.error('Error sending verification email:', error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl mb-4 text-center">Contact Details</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700">Full Name:</label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700">Profile Photo URL:</label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            type="text"
            value={profilePhotoURL}
            onChange={(e) => setProfilePhotoURL(e.target.value)}
          />
        </div>
        <button
          className="w-full px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 focus:outline-none focus:bg-red-600"
          onClick={handleUpdate}
        >
          Update
        </button>
        {!verificationSent && (
          <button
            className="w-full px-4 py-2 mt-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={handleSendVerificationEmail}
          >
            Verify Email
          </button>
        )}
        {verificationSent && (
          <p className="text-center mt-4 text-green-500">
            Verification email sent. Please check your email.
          </p>
        )}
        <button
          className="w-full px-4 py-2 mt-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
