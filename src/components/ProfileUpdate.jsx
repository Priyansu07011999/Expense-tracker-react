import React, { useState } from 'react';

function ProfileUpdatePage({ onCancel }) {
  const [fullName, setFullName] = useState('');
  const [profilePhotoURL, setProfilePhotoURL] = useState('');

  const handleUpdate = () => {
    console.log('Profile updated:', { fullName, profilePhotoURL });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl mb-4 text-center">Contact Details</h1>
      <p className="mb-4 text-center text-gray-500">Winners never quit, Quitters never win.</p>
      <p className='mb-4 text-center text-black-500'>Your Profile is 64% Complete.A complete profile has higher chance to get a job. <button className='text-blue-400'>Complete Now</button></p>
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
