
import { Routes, Route } from 'react-router-dom'
import PassengerDashbaord from './PassengerDashboard'
import PassengerProfile from './PassengerProfile'
import Allusers from './Allusers'
import MyBookings from './MyBookings'



const studentdashboard = () => {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<PassengerDashbaord />} />
        <Route path="/profile" element={<PassengerProfile />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/allusers" element={<Allusers />} /> 
       
        {/* Add more routes as needed */}
      </Routes>
    </>
  )
}

export default studentdashboard