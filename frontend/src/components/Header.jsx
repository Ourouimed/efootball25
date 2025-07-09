import { Link , useLocation } from 'react-router-dom'
import { useState , useEffect } from 'react'
import { GitHub, Instagram, Menu, WhatsApp } from '@mui/icons-material'
import MenuHome from './MenuHome'
import { SideNavContext } from '../contexts/Sidenavontext'
import { links } from '../utils/links'
const Header = ({fixed = false})=>{
    const location = useLocation()
    const [currLocation , setCurrLocation] = useState('/')
    const [MenuIsOpen , setMenuIsOpen]= useState(false) 
    
    useEffect(()=>{
        setCurrLocation(location.pathname)
    } , [location.pathname])

    const navLink = 'py-2 px-4 md:px-8 rounded-full block text-sm sm:text-lg md:text-xl;'

    return <header className={` px-4 md:px-[10%] py-4 text-white flex justify-between items-center ${fixed? 'fixed w-full bg-transparent' : 'sticky bg-primary'} top-0 z-20`}>
        <Link to='/' className='text-fourth text-2xl md:text-3xl uppercase'>
            efootball
            <p className='text-sm'>By ourouimed</p>
        </Link>
        <nav className='hidden md:flex items-center gap-4 '>
            <ul className='bg-secondary rounded-full flex gap-2 justify-between items-center px-2 py-1'>
                {links.map(link => <li key={link.name}>
                    <Link to={link.location} className={`${currLocation === link.location ? 'bg-fourth text-primary' : 'text-fourth'} ${navLink}`}>
                    {link.name}
                    </Link>
                </li>)}
                
            </ul>
            <Link to='/dashboard' className='py-2 px-8 rounded-full block text-xl bg-third'>Admin</Link>
            <div className='hidden lg:flex items-center gap-1'>
                <a className='flex items-center justify-center rounded-full w-[40px] h-[40px] bg-[#181717]' href='https://github.com/Ourouimed' target='_blank'><GitHub/></a>
                <a className='flex items-center justify-center rounded-full w-[40px] h-[40px] bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600' href='https://instagram.com/Ourouimed' target='_blank'><Instagram/></a>
                <a className='flex items-center justify-center rounded-full w-[40px] h-[40px] bg-[#25D366]' href='https://chat.whatsapp.com/BAo7vytVWKI05VpkhOXOd3' target='_blank'><WhatsApp/></a>
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