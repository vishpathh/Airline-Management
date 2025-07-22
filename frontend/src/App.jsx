import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from '../src/components/Register';
import Home from '../src/components/Home';
import Login from '../src/components/Login';
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoutes from './components/AdminRoutes';
import PassengerRoutes from './components/PassengerRoutes'; // Import your student routes component
import Navbar from './components/Navbar';
const App = () => {
  return (
   
      <div className="min-h-screen bg-gray-50 font-sans">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

          {/* Add more routes here like <Route path="/login" element={<Login />} /> */}
             <Route
          path="/admin/*"
          element={
            <ProtectedRoute
              roles={['admin']} // Only allow employer role
              component={AdminRoutes} // Replace with your component
            />
          }
        />
         <Route
          path="/passenger/*"
          element={   
            <ProtectedRoute
              roles={['passenger']} // Only allow employer role
              component={PassengerRoutes} // Replace with your component
            />
          }
        />
        
        </Routes>
      </div>
    
  );
};

export default App;
