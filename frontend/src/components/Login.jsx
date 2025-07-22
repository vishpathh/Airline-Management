import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AtSymbolIcon, KeyIcon } from '@heroicons/react/24/outline';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ email, password });
      if (result && result.success) {
        setMessage('Login successful!');
        // navigate('/dashboard'); // Enable if needed
      } else {
        setMessage('Invalid email or password');
      }
    } catch (err) {
      setMessage('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-black px-4 py-10">
      <div className="bg-white bg-opacity-10 backdrop-blur-md shadow-2xl rounded-3xl p-8 max-w-md w-full border border-indigo-500 text-white transition-all">
        <h2 className="text-3xl font-bold text-center text-indigo-300 mb-6">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <AtSymbolIcon className="absolute w-5 h-5 text-indigo-300 left-3 top-3.5" />
            <input
              type="email"
              className="w-full pl-10 px-4 py-2 rounded-xl bg-gray-800 text-white border border-indigo-400 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="relative">
            <KeyIcon className="absolute w-5 h-5 text-indigo-300 left-3 top-3.5" />
            <input
              type="password"
              className="w-full pl-10 px-4 py-2 rounded-xl bg-gray-800 text-white border border-indigo-400 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {message && (
            <div
              className={`text-center text-sm ${
                message === 'Login successful!' ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all text-white font-semibold py-3 rounded-xl"
          >
            Sign In
          </button>

          <div className="text-center mt-4 text-sm text-indigo-200">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-400 hover:underline">
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
