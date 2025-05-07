import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import { Tooltip } from 'react-tooltip';

import { useAuth } from '../../../auth/AuthContext.jsx';
import { MenuItem } from '../../ui/MenuItem.jsx';
import Logo from '../../ui/Logo.jsx';

import './Header.scss';

const adminLinks = [
    {
        to: '/criar-postagem',
        icon: 'bi-pencil-square',
        label: 'Criar um novo post',
    },
    {
        to: '/configurar-disponibilidade',
        icon: 'bi-gear-wide',
        label: 'Configuração de Disponibilidade',
    },
    {
        to: '/agendados',
        icon: 'bi-card-checklist',
        label: 'Consultas Agendadas',
    },
];

const userLinks = [
    { to: '/perfil', icon: 'bi-person-circle', label: 'Perfil' },
    { to: '/agendamento', icon: 'bi-clock', label: 'Agendar uma Consulta' },
];

function Header() {
    const { role, logout } = useAuth();
    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <header className='header'>
            <div className='header__container'>
                <Link to={'/blog'}>
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

                <div className='header__wrapper-button'>
                    {role === null && (
                        <>
                            <Link to={'/login'}>
                                <i
                                    className='bi bi-person-circle'
                                    data-tooltip-id='login-tooltip'
                                    data-tooltip-content='Login'
                                ></i>
                            </Link>
                            <Tooltip id='login-tooltip' />
                        </>
                    )}

                    <i className='bi bi-list' onClick={toggleMenu}></i>
                    {role !== null && (
                        <>
                            <div onClick={handleLogout}>
                                <i
                                    className='bi bi-box-arrow-right'
                                    data-tooltip-id='exit-tooltip'
                                    data-tooltip-content='Sair'
                                ></i>
                                <Tooltip id='exit-tooltip' />
                            </div>
                        </>
                    )}
                </div>

                {/* Overlay escuro ao abrir o menu */}
                {isMenuOpen && (
                    <div className='overlay' onClick={toggleMenu}></div>
                )}

                {isMenuOpen && (
                    <div className='header__menu' ref={menuRef}>
                        <i className='bi bi-x-lg' onClick={toggleMenu}></i>

                        {role === 'admin' &&
                            adminLinks.map((item) => (
                                <MenuItem
                                    key={item.to}
                                    {...item}
                                    onClick={toggleMenu}
                                />
                            ))}

                        {role &&
                            role !== 'admin' &&
                            userLinks.map((item) => (
                                <MenuItem
                                    key={item.to}
                                    {...item}
                                    onClick={toggleMenu}
                                ></MenuItem>
                            ))}

                        {!role && (
                            <MenuItem
                                to='/login'
                                icon='bi-clock loggedout'
                                label='Você precisa estar logado para agendar!'
                            />
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
