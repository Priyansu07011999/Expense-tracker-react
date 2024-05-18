import React, { useState, useEffect } from 'react';

function ProfileUpdatePage({ onCancel, idToken, onProfileCompletion }) {
  const [fullName, setFullName] = useState('');
  const [profilePhotoURL, setProfilePhotoURL] = useState('');
  const [profileData, setProfileData] = useState(null);
  const firebaseDatabaseURL = 'https://expense-tracker-d154c-default-rtdb.firebaseio.com/users';

  const fetchProfileData = async () => {
    try {
      const response = await fetch(`${firebaseDatabaseURL}.json?auth=${idToken}`);
      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }
      const data = await response.json();
      setProfileData(data);
    } catch (error) {
      console.error('Error fetching profile data:', error.message);
    }
  };

  useEffect(() => {
    if (idToken) {
      fetchProfileData();
    }
  }, [idToken]);

  useEffect(() => {
    if (profileData) {
      if (profileData.fullName) setFullName(profileData.fullName);
      if (profileData.profilePhotoURL) setProfilePhotoURL(profileData.profilePhotoURL);
    }
  }, [profileData]);

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

  const profileCompletion = fullName && profilePhotoURL ? '100%' : '65%';

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
        <button
          className="w-full px-4 py-2 mt-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          onClick={onCancel}
        >
          Cancel
        </button>
        <p className="text-center mt-4">
          Your profile is {profileCompletion} completed.
        </p>
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
