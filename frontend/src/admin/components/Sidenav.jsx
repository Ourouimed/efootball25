import { Menu , Home, Group, SportsSoccer, Settings} from '@mui/icons-material';
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
                <li><Link to='/dashboard' className={`${location.pathname == '/dashboard' ? 'bg-primary/10 text-primary' : 'text-primary'}`}><Home/>Home</Link></li>
                <li><Link to='/dashboard/teams' className={`${location.pathname == '/dashboard/teams' ? 'bg-primary/10 text-primary' : 'text-primary'}`}><Group/>teams</Link></li>
                <li><Link to='/dashboard/matches'className={`${location.pathname == '/dashboard/matches' ? 'bg-primary/10 text-primary' : 'text-primary'}`}><SportsSoccer/>matches</Link></li>
                <li><Link to='/dashboard/settings'className={`${location.pathname == '/dashboard/settings' ? 'bg-primary/10 text-primary' : 'text-primary'}`}><Settings/>settings</Link></li>
                
            </ul>
        </div>
    </>
}


export default Sidenav