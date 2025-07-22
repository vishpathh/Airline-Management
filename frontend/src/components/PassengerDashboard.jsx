import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaPlane, FaSignOutAlt } from 'react-icons/fa';

const PassengerDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 flex flex-col items-center justify-center px-4 py-10 text-gray-800 font-sans">

      {/* Welcome Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">Welcome, Passenger!</h1>
        <p className="text-lg text-gray-600">Manage your bookings, update profile, and explore flights with ease.</p>
      </div>

      {/* Dashboard Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full px-4">

        <Link
          to="/passenger/profile"
          className="bg-white hover:bg-indigo-50 border border-indigo-200 rounded-2xl p-6 flex items-center shadow-md hover:shadow-xl transition duration-300"
        >
          <FaUserCircle className="text-indigo-600 text-3xl mr-4" />
          <div>
            <h3 className="text-xl font-semibold">View Profile</h3>
            <p className="text-gray-500 text-sm">Check and update your personal details</p>
          </div>
        </Link>

         <Link
          to="/passenger/mybookings"
          className="bg-white hover:bg-indigo-50 border border-indigo-200 rounded-2xl p-6 flex items-center shadow-md hover:shadow-xl transition duration-300"
        >
          <FaUserCircle className="text-indigo-600 text-3xl mr-4" />
          <div>
            <h3 className="text-xl font-semibold">my bookings</h3>
            <p className="text-gray-500 text-sm"> personal details</p>
          </div>
        </Link>

       

      </div>

      {/* Footer */}
      <div className="mt-16 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} AirEase Airlines. All rights reserved.
      </div>
    </div>
  );
};

export default PassengerDashboard;
