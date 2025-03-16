import { Route , Routes } from "react-router-dom"
import Home from "./pages/Home"
import Stats from "./pages/Stats"
import Register from "./pages/Register"
import Header from "./components/Header"
import Footer from "./components/Footer"
const App = ()=>{
    return <>
    <Header />
    {/* Routes */}
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/stats" element={<Stats />}/>
    </Routes>
    <Footer />
    </>
    
}


export default App