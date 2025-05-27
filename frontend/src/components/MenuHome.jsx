import { Menu, Person , Home , BarChart , AddCircle , GitHub , Instagram , WhatsApp } from '@mui/icons-material'
import { SideNavContext } from '../contexts/Sidenavontext'
import { useContext } from 'react'
import { Link  , useLocation} from 'react-router-dom'
import { links } from '../utils/links'
const MenuHome = ()=>{
    const location = useLocation()
    const { currentState , toggleSidenav} = useContext(SideNavContext)
     const menuHomeStyle = 'fixed top-0 left-0 h-screen max-w-[90%] bg-white shadow-md z-20 overflow-hidden transition-all duration-300 ease-in-out md:hidden'
    const MenuLinkStyle = 'flex items-center py-2 px-4 rounded-md text-base md:text-xl hover:bg-third hover:text-white transition-all duration-300 ease-in-out'
    return <>
        <div className={`${menuHomeStyle} ${currentState ? "w-[300px]" : "w-0"} `}>
            <div className="flex items-center justify-between py-2 px-4 border-2 border-[#ededed]">
                <h3 className="text-2xl text-primary">Efootball</h3>
                <button className='cursor-pointer' onClick={toggleSidenav}><Menu fontSize="large" className='text-primary'/></button>
            </div>
            <ul className='py-2 px-4 space-y-2'>
            {links.map(({ location: path, name, icon: Icon }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className={`${location.pathname === path ? 'bg-third text-white' : 'text-primary'} ${MenuLinkStyle}`}
                  >
                    <Icon /> {name}
                  </Link>
                </li>
              ))}

                

                <li><Link to='/dashboard'className={`${MenuLinkStyle} text-primary`}><Person/>Admin</Link></li>
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