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
import Settings from './admin/pages/Settings'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { SettingsContext } from './contexts/SettingsContext'
const App = () => {
  const [settings , setSettings] = useState([])
  const [error , setError] = useState(null)

  const API_URL = process.env.NODE_ENV === 'production' ? import.meta.env.VITE_API_URL : 'http://localhost:3001';

  const getSettings = async ()=>{
    try {
      let res = await axios.get(`${API_URL}/settings`)
      setSettings(res.data)
    }
    catch {
      setError('Failed to fetch Settings');
    }
  }


  useEffect(()=>{
    getSettings()
  },[])


  return <>
    <SettingsContext.Provider value={{settings : settings }}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/stats' element={<Stats />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='teams' element={<Teams />} />
          <Route path='matches' element={<Matches/>} />
          <Route path='settings' element={<Settings/>} />
        </Route>

        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </SettingsContext.Provider>
  </>
};

export default App;
