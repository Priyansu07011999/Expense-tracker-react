import React, { useState } from 'react';

function ProfileUpdatePage({ onCancel }) {
  const [fullName, setFullName] = useState('');
  const [profilePhotoURL, setProfilePhotoURL] = useState('');
  const API_KEY = "my_id"; // Replace with your Firebase API Key

  const handleUpdate = async () => {
    const idToken = 'my_token'

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idToken: idToken,
          displayName: fullName,
          photoUrl: profilePhotoURL,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      console.log('Profile updated successfully');

    } catch (error) {
      console.error('Error updating profile:', error.message);
    
    }
    setFullName('')
    setProfilePhotoURL('')
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
