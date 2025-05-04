import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Stats from './pages/Stats'
import Register from './pages/Register'
import Dashboard from './admin/pages/Dashboard'
import Login from './admin/pages/Login'
import ErrorPage from './pages/ErrorPage'
import Teams from './admin/pages/Teams'
import DashboardLayout from './admin/pages/DashboardLayout'
import Matches from './admin/pages/Matches'
const App = () => {
  return <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/stats' element={<Stats />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />

      <Route path='/dashboard' element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path='teams' element={<Teams />} />
        <Route path='matches' element={<Matches/>} />
      </Route>

      <Route path='*' element={<ErrorPage />} />
    </Routes>
  </>
};

export default App;
