// import Logo from '../assets/images/logoBgremove.png'
import { Link } from 'react-router-dom'
const Header = ()=>{
    return <header className='header'>
        <h1 className='text-[var(--third-color)] text-2xl font-bold'>EFOOTBALL League</h1>
        <nav className='navbar'>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/stats'>Tournements Stats</Link>
                </li>
                <li>
                    <Link to='/register' className='font-bold bg-[var(--fourth-color)] rounded-full py-2 px-4'>Register</Link>
                </li>
                
            </ul>
        </nav>
    </header>
}


export default Header