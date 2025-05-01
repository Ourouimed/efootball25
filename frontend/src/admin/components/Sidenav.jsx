import { Menu , Home} from '@mui/icons-material';
import { useContext } from 'react';
import { SideNavContext } from '../../contexts/Sidenavontext';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Sidenav = ()=>{
    const location = useLocation()
    const { currentState , toggleSidenav } = useContext(SideNavContext)
    return <>
        <div className={`sidenav ${currentState ? "w-[300px]" : "w-0"}`}>
            <div className="flex items-center justify-between py-2 px-4 border-2 border-[#ededed]">
                <h3 className="text-2xl text-primary">AdminPanel</h3>
                <button className='cursor-pointer' onClick={toggleSidenav}><Menu/></button>
            </div>
            <ul className='py-2 px-4'>
                <li><Link to='/dashbord' className={`${location.pathname == '/dashbord' ? 'bg-primary/10 text-primary' : 'text-primary'}`}><Home/>Home</Link></li>
                <li><Link to='/dashbord/settings' className={`${location.pathname == '/dashbord/settings' ? 'bg-primary/10 text-primary' : 'text-primary'}`}><Home/>Home</Link></li>
                <li><Link to='/dashbord/test'className={`${location.pathname == '/dashbord/test' ? 'bg-primary/10 text-primary' : 'text-primary'}`}><Home/>Home</Link></li>
                <li><Link to='/dashbord/test2'className={`${location.pathname == '/dashbord/test2' ? 'bg-primary/10 text-primary' : 'text-primary'}`}><Home/>Home</Link></li>
                
            </ul>
        </div>
    </>
}


export default Sidenav