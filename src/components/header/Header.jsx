import { Link } from 'react-router';

import Logo from '../Logo';
import './Header.scss';

function Header() {
    return (
        <header className='header'>
            <div className='header__container'>
                <Link to={'/home'}>
                    <div className='header__logo'>
                        <Logo />
                        <h1 className='header__title'>
                            <span>B</span>
                            <span>a</span>
                            <span>m</span>
                            <span>b</span>
                            <span>o</span>
                            <span>o</span>
                        </h1>
                    </div>
                </Link>
                <div className='header__icon'>
                    <Link to={'/login'}>
                        <i className='bi bi-person-circle'></i>
                    </Link>
                    <Link to={'/criar'}>
                        <i className='bi bi-pencil-square'></i>
                    </Link>
                    <Link to={'/agendamento'}>
                        <i className='bi bi-clock'></i>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
