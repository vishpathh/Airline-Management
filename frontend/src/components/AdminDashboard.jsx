import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserShield, FaUsersCog } from 'react-icons/fa';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 flex flex-col items-center justify-center px-4 py-10 text-gray-800 font-sans">
      
   
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">Welcome, Admin!</h1>
        <p className="text-lg text-gray-600">Manage users, view reports, and oversee the airline booking system.</p>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full px-4">

        <Link
          to="/admin/profile"
          className="bg-white hover:bg-indigo-50 border border-indigo-200 rounded-2xl p-6 flex items-center shadow-md hover:shadow-xl transition duration-300"
        >
          <FaUserShield className="text-indigo-600 text-3xl mr-4" />
          <div>
            <h3 className="text-xl font-semibold">View Profile</h3>
            <p className="text-gray-500 text-sm">Check and update your admin profile details</p>
          </div>
        </Link>

        <Link
          to="/admin/userlist"
          className="bg-white hover:bg-indigo-50 border border-indigo-200 rounded-2xl p-6 flex items-center shadow-md hover:shadow-xl transition duration-300"
        >
          <FaUsersCog className="text-green-600 text-3xl mr-4" />
          <div>
            <h3 className="text-xl font-semibold">Manage Users</h3>
            <p className="text-gray-500 text-sm">View and manage registered users</p>
          </div>
        </Link>

         <Link
          to="/admin/manageflights"
          className="bg-white hover:bg-indigo-50 border border-indigo-200 rounded-2xl p-6 flex items-center shadow-md hover:shadow-xl transition duration-300"
        >
          <FaUserShield className="text-indigo-600 text-3xl mr-4" />
          <div>
            <h3 className="text-xl font-semibold">view</h3>
            <p className="text-gray-500 text-sm">Add Flight</p>
          </div>
        </Link>

        

      </div>

      {/* Footer */}
       <div className="mt-16 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} AirEase Airlines. Admin Portal.
       </div>
    </div>
  );
};

export default AdminDashboard;
