import { Logout, Menu } from '@mui/icons-material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SideNavContext } from '../../contexts/Sidenavontext';
import axios from 'axios';
const Navbar = ()=>{
    const navigate = useNavigate()
    const { toggleSidenav } = useContext(SideNavContext)
    const handleLogoutSession = async () => {
        let user  = JSON.parse(localStorage.getItem('user'))
        localStorage.removeItem('user');
        navigate('/login');
        try {
            await axios.delete('http://localhost:3001/logout',  { data : user } );
        } catch (err) {
            console.error(err);
            alert('Cannot log out');
        }
    }
    return <>
        <nav className="navbar">
            <div className="flex items-center gap-2">
                <button className='cursor-pointer' onClick={toggleSidenav}><Menu/></button>
                <h3 className="text-2xl">Admin Dashbord</h3>   
            </div>
            <button className='flex items-center cursor-pointer' onClick={handleLogoutSession}><Logout/> logOut</button>
        </nav>
    </>
}


export default Navbar