import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-indigo-900 to-black text-white shadow-lg sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400"
          >
            AirEase
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-indigo-400 transition font-medium">
              Home
            </Link>
            {!user ? (
              <>
                <Link to="/login" className="hover:text-indigo-400 transition font-medium">
                  Login
                </Link>
                <Link to="/register" className="hover:text-indigo-400 transition font-medium">
                  Register
                </Link>
              </>
            ) : (
              <>
                <span className="font-medium text-indigo-300">
                  Hi, {user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
                </span>
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white font-semibold transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-indigo-300 hover:text-white focus:outline-none"
            >
              {menuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pt-3 pb-4 space-y-3 bg-black bg-opacity-80 backdrop-blur-md">
          <Link to="/" className="block hover:text-indigo-300 font-medium">
            Home
          </Link>
          {!user ? (
            <>
              <Link to="/login" className="block hover:text-indigo-300 font-medium">
                Login
              </Link>
              <Link to="/register" className="block hover:text-indigo-300 font-medium">
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="block text-indigo-300 font-medium">
                Hi, {user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
              </span>
              <button
                onClick={logout}
                className="w-full text-left text-red-500 hover:text-red-600 font-medium"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
