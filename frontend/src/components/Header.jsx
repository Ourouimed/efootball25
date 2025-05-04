import { Link , useLocation } from 'react-router-dom'
import { useState , useEffect } from 'react'
import { GitHub, Instagram, Menu, WhatsApp } from '@mui/icons-material'
import MenuHome from './MenuHome'
import { SideNavContext } from '../contexts/Sidenavontext'
const Header = ()=>{
    const location = useLocation()
    const [currLocation , setCurrLocation] = useState('/')
    const [MenuIsOpen , setMenuIsOpen]= useState(false) 
    useEffect(()=>{
        setCurrLocation(location.pathname)
    } , [location.pathname])

    return <header>
        <Link to='/' className='home-link'>
            efootball
            <p className='text-sm'>By ourouimed</p>
        </Link>
        <nav className='hidden md:flex items-center gap-4 '>
            <ul className='nav-links'>
                <li>
                    <Link to='/' className={currLocation === '/' ? 'bg-fourth text-primary' : 'text-fourth'}>
                    Home
                    </Link>
                </li>
                <li>
                    <Link to='/stats' className={currLocation === '/stats' ? 'bg-fourth text-primary' : 'text-fourth'}>Stats</Link>
                </li>
                <li>
                    <Link to='/register' className={currLocation === '/register' ? 'bg-fourth text-primary' : 'text-fourth'}>Register</Link>
                </li>
            </ul>
            <Link to='/dashboard' className='py-2 px-8 rounded-full block text-xl bg-third'>Admin</Link>
            <div className='hidden lg:flex items-center gap-1'>
                <a className='flex items-center justify-center rounded-full w-[40px] h-[40px] bg-[#181717]' href='https://github.com/Ourouimed' target='_blank'><GitHub/></a>
                <a className='flex items-center justify-center rounded-full w-[40px] h-[40px] bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600' href='https://instagram.com/Ourouimed' target='_blank'><Instagram/></a>
                <a className='flex items-center justify-center rounded-full w-[40px] h-[40px] bg-[#25D366]' href='' target='_blank'><WhatsApp/></a>
            </div>
        </nav>
        <button className='bg-third p-2 rounded flex items-center justify-center cursor-pointer md:hidden' onClick={()=> {setMenuIsOpen(!MenuIsOpen)}}><Menu fontSize='medium'/></button>
        <SideNavContext.Provider value={{
            currentState: MenuIsOpen,
            toggleSidenav: () => setMenuIsOpen(!MenuIsOpen)}}
        >
            <MenuHome/>
        </SideNavContext.Provider>
        
    </header>
}

export default Header