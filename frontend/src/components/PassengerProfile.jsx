import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from './api'; // Ensure correct path

const PassengerProfile = () => {
  const { user, loading, setUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        role: user.role || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await api.put('/api/users/profile', formData, {
        withCredentials: true,
      });
      setUser((prevUser) => ({
        ...prevUser,
        ...formData,
      }));
      setMessage('✅ Profile updated successfully.');
      setEditMode(false);
    } catch (error) {
      console.error('Update failed:', error);
      setMessage('❌ Failed to update profile.');
    }
  };

  if (loading) return <div className="text-center py-10 text-gray-500">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 px-6 py-12 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white bg-opacity-60 backdrop-blur-md shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center">Passenger Profile</h2>

        {message && (
          <div className={`text-center mb-6 font-medium ${message.includes('success') ? 'text-green-600' : 'text-red-500'}`}>
            {message}
          </div>
        )}

        {user ? (
          <div className="space-y-6 text-gray-800">
            {/* Profile Field */}
            {['name', 'email'].map((field) => (
              <div key={field} className="flex flex-col sm:flex-row sm:items-center">
                <label className="w-32 font-semibold capitalize">{field}:</label>
                {editMode ? (
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="mt-1 sm:mt-0 flex-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                ) : (
                  <p className="ml-2 text-gray-700">{user[field]}</p>
                )}
              </div>
            ))}

            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="w-32 font-semibold">Role:</label>
              <p className="ml-2 capitalize text-indigo-600">{user.role}</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="w-32 font-semibold">User ID:</label>
              <p className="ml-2 text-gray-600">{user._id || user.userId}</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="w-32 font-semibold">Joined:</label>
              <p className="ml-2 text-gray-600">
                {user.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A'}
              </p>
            </div>

            {/* Action Buttons */}
            {editMode ? (
              <div className="flex gap-4 justify-center mt-6">
                <button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md shadow transition"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-md transition"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="text-center mt-6">
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full shadow-lg transition"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-red-500 text-center">No user data available. Please log in.</p>
        )}
      </div>
    </div>
  );
};

export default PassengerProfile;
