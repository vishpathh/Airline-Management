import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUserEdit, FaEnvelope, FaIdBadge, FaUserShield } from 'react-icons/fa';
import api from '../components/api';

const AdminDashboard = () => {
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

      setMessage('Profile updated successfully.');
      setEditMode(false);
    } catch (error) {
      console.error('Update failed:', error);
      setMessage('Failed to update profile.');
    }
  };

  if (loading) return <div className="text-center text-xl py-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 flex flex-col items-center justify-center px-4 py-12 font-sans">
      
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl p-8">
        <h1 className="text-3xl font-extrabold text-indigo-700 text-center mb-6">Admin Profile</h1>

        {message && (
          <div className={`mb-4 text-center font-medium ${message.includes('successfully') ? 'text-green-600' : 'text-red-500'}`}>
            {message}
          </div>
        )}

        {user ? (
          <div className="space-y-6 text-gray-800">
            {/* Name */}
            <div className="flex items-center gap-3">
              <FaUserEdit className="text-indigo-500 text-xl" />
              <label className="font-semibold">Name:</label>
              {editMode ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-gray-300 px-3 py-1 rounded w-full"
                />
              ) : (
                <span className="ml-2">{user.name}</span>
              )}
            </div>

            {/* Email */}
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-indigo-500 text-xl" />
              <label className="font-semibold">Email:</label>
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-gray-300 px-3 py-1 rounded w-full"
                />
              ) : (
                <span className="ml-2">{user.email}</span>
              )}
            </div>

            {/* Role */}
            <div className="flex items-center gap-3">
              <FaUserShield className="text-indigo-500 text-xl" />
              <label className="font-semibold">Role:</label>
              <span className="ml-2 capitalize">{user.role}</span>
            </div>

            {/* User ID */}
            <div className="flex items-center gap-3">
              <FaIdBadge className="text-indigo-500 text-xl" />
              <label className="font-semibold">User ID:</label>
              <span className="ml-2 text-gray-600">{user._id || user.userId}</span>
            </div>

            {/* Account Created */}
            <div className="flex items-center gap-3">
              <label className="font-semibold">Created At:</label>
              <span className="ml-2 text-gray-600">
                {user.createdAt ? new Date(user.createdAt).toLocaleString() : 'Not available'}
              </span>
            </div>

            {/* Buttons */}
            {editMode ? (
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-400 text-white px-6 py-2 rounded-full hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-red-500 text-center mt-6">No user data available. Please log in.</p>
        )}
      </div>

      <footer className="text-sm text-gray-400 mt-10 text-center">
        &copy; {new Date().getFullYear()} AirEase Admin Portal. All rights reserved.
      </footer>
    </div>
  );
};

export default AdminDashboard;
