import { Routes , Route , Link } from 'react-router-dom'
import Home from './pages/Home'
import Stats from './pages/Stats'
import Register from './pages/Register'
import Header from './components/Header'
const App = ()=>{
  return <>
      <Header></Header>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/stats' element={<Stats/>}/>
      <Route path='/register' element={<Register/>}/>
      </Routes>   
  </>
}


export default App