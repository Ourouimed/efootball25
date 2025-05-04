import { Menu, Person , Home , BarChart , AddCircle , GitHub , Instagram , WhatsApp } from '@mui/icons-material'
import { SideNavContext } from '../contexts/Sidenavontext'
import { useContext } from 'react'
import { Link  , useLocation} from 'react-router-dom'
const MenuHome = ()=>{
    const location = useLocation()
    const { currentState , toggleSidenav} = useContext(SideNavContext)
    return <>
        <div className={`menu-home ${currentState ? "w-[300px]" : "w-0"} `}>
            <div className="flex items-center justify-between py-2 px-4 border-2 border-[#ededed]">
                <h3 className="text-2xl text-primary">Efootball</h3>
                <button className='cursor-pointer' onClick={toggleSidenav}><Menu fontSize="large" className='text-primary'/></button>
            </div>
            <ul className='py-2 px-4'>
                <li><Link to='/' className={`${location.pathname == '/' ? 'bg-third text-white' : 'text-primary'}`}><Home/>Home</Link></li>
                <li><Link to='/stats' className={`${location.pathname == '/stats' ? 'bg-third text-white' : 'text-primary'}`}><BarChart/>Stats</Link></li>
                <li><Link to='/register'className={`${location.pathname == '/register' ? 'bg-third text-white' : 'text-primary'}`}><AddCircle/>Register</Link></li>
                <li><Link to='/dashboard'className='text-primary'><Person/>Admin</Link></li>
            </ul>
            <div className='py-2 px-4 flex items-center gap-1 justify-center'>
                <a className='flex items-center justify-center rounded w-[40px] h-[40px] bg-[#181717]' href='https://github.com/Ourouimed' target='_blank'><GitHub/></a>
                <a className='flex items-center justify-center rounded w-[40px] h-[40px] bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600' href='https://instagram.com/Ourouimed' target='_blank'><Instagram/></a>
                <a className='flex items-center justify-center rounded w-[40px] h-[40px] bg-[#25D366]' href='' target='_blank'><WhatsApp/></a>
            </div>
        </div>
    </>
}

export default MenuHome