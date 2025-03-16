import Logo from '../assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const navigate = useNavigate(); // Hook for programmatic navigation

    const handleSelectChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);
        navigate(value); // Navigate to the selected route
    };

    return (
        <div className='md:fixed top-0 w-full left-0 md:top-5'>
            <header className='header'>
                <img src={Logo} className='w-[50px]' alt='Logo' />
                <select
                    value={selectedValue}
                    onChange={handleSelectChange}
                    className='outline-0 p-2 md:hidden bg-fourth rounded text-white'
                >
                    <option value="/">Home</option>
                    <option value="/stats">Stats</option>
                    <option value="/register">Register</option>
                </select>
                <nav className='navbar'>
                    <ul>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/stats'>Tournaments Stats</Link>
                        </li>
                        <li>
                            <Link to='/register' className='font-bold bg-fourth rounded-full py-2 px-4'>
                                Register
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default Header;