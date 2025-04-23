import { Link } from 'react-router-dom'
const Header = ()=>{
    return <header>
        <Link to='/' className='home-link'>
            football
        </Link>
        <nav className=''>
            <ul className='nav-links'>
                <li>
                    <Link to='/'>home</Link>
                </li>
                <li>
                    <Link to='/stats'>Stats</Link>
                </li>
                <li>
                    <Link to='/register'>Register</Link>
                </li>
            </ul>
        </nav>
    </header>
}

export default Header