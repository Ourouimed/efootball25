import { Menu } from '@mui/icons-material';
import { useContext } from 'react';
import { SideNavContext } from '../../contexts/Sidenavontext';
const Navbar = ()=>{
    const { toggleSidenav } = useContext(SideNavContext)
    return <>
        <nav className="navbar">
            <div className="flex items-center gap-2">
                <button className='cursor-pointer' onClick={toggleSidenav}><Menu/></button>
                <h3 className="text-2xl">Admin Dashbord</h3>   
            </div>
            
        </nav>
    </>
}


export default Navbar