import { Routes , Route , Link } from 'react-router-dom'
import Home from './pages/Home'
import Stats from './pages/Stats'
import Register from './pages/Register'
import Dashboard from './admin/pages/Dashboard'
import Login from './admin/pages/Login'
import ErrorPage from './pages/ErrorPage'
const App = ()=>{
  return <>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/stats' element={<Stats/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='*' element={<ErrorPage />}/>
      </Routes>   
  </>
}


export default App