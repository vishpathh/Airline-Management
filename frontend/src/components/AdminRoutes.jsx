import { Routes, Route } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'
import Profile from './profile'
import UserList from './UserList'
import ManageFlights from './ManageFlights'


const AdminRoutes = () => {
  return (
    <>
      <Routes>
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/userlist" element={<UserList />} />
      <Route path="/manageflights" element={<ManageFlights/>} />
      </Routes>
    </>
  )
}

export default AdminRoutes