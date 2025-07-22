import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AtSymbolIcon, KeyIcon, UserIcon } from '@heroicons/react/24/outline';
import api from './api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'passenger',
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await api.post('/api/auth/register', formData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      navigate('/login');
      setMessage(res.data.message || 'Registered successfully');
      setFormData({ name: '', email: '', password: '', role: 'passenger' });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-black px-4 py-10">
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-3xl w-full max-w-md text-white shadow-2xl border border-indigo-500 transition-all">
        <h2 className="text-3xl font-bold text-center text-indigo-300 mb-6">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <UserIcon className="absolute w-5 h-5 text-indigo-300 left-3 top-3.5" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 pl-10 rounded-xl bg-gray-800 border border-indigo-400 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          <div className="relative">
            <AtSymbolIcon className="absolute w-5 h-5 text-indigo-300 left-3 top-3.5" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 pl-10 rounded-xl bg-gray-800 border border-indigo-400 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          <div className="relative">
            <KeyIcon className="absolute w-5 h-5 text-indigo-300 left-3 top-3.5" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 pl-10 rounded-xl bg-gray-800 border border-indigo-400 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-gray-800 border border-indigo-400 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="passenger">Passenger</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all text-white font-semibold py-3 rounded-xl"
          >
            Create Account
          </button>
        </form>

        {message && <p className="mt-4 text-green-400 text-center">{message}</p>}
        {error && <p className="mt-4 text-red-400 text-center">{error}</p>}

        <div className="text-center mt-6 text-sm text-indigo-200">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-400 hover:underline">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
