import { Link , useLocation } from 'react-router-dom'
import { useState , useEffect } from 'react'
const Header = ()=>{
    const location = useLocation()
    const [currLocation , setCurrLocation] = useState('/')
    useEffect(()=>{
        setCurrLocation(location.pathname)
    } , [location.pathname])
    return <header>
        <Link to='/' className='home-link'>
            football
        </Link>
        <nav className='flex items-center gap-4'>
            <ul className='nav-links'>
                <li>
                    <Link to='/' className={currLocation === '/' ? 'bg-fourth text-primary' : 'text-fourth'}>home</Link>
                </li>
                <li>
                    <Link to='/stats' className={currLocation === '/stats' ? 'bg-fourth text-primary' : 'text-fourth'}>Stats</Link>
                </li>
                <li>
                    <Link to='/register' className={currLocation === '/register' ? 'bg-fourth text-primary' : 'text-fourth'}>Register</Link>
                </li>
            </ul>
            <Link to='/dashboard' className='py-2 px-8 rounded-full block text-xl bg-third'>Admin</Link>
        </nav>
    </header>
}

export default Header