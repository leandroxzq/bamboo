import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../../auth/AuthContext.jsx';
import { useState, useEffect, useRef } from 'react';

import { Tooltip } from 'react-tooltip';

import Logo from '../../ui/Logo.jsx';
import './Header.scss';

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

                        {role === 'admin' && (
                            <>
                                <Link to={'/criar-postagem'}>
                                    <i className='bi bi-pencil-square'></i>
                                    Criar um novo post
                                </Link>
                                <Link
                                    to={'/configurar-disponibilidade'}
                                    onClick={toggleMenu}
                                >
                                    <i className='bi bi-gear-wide'></i>
                                    Configuração de Disponibilidade
                                </Link>
                                <Link to={'/agendados'} onClick={toggleMenu}>
                                    <i className='bi bi-card-checklist'></i>
                                    Consultas Agendadas
                                </Link>
                            </>
                        )}

                        {role !== null ? (
                            role !== 'admin' && (
                                <>
                                    <Link to={'/perfil'} onClick={toggleMenu}>
                                        <i className='bi bi-person-circle'></i>
                                        Perfil
                                    </Link>
                                    <Link to={'/agendamento'}>
                                        <i className='bi bi-clock'></i> Agendar
                                        uma Consulta
                                    </Link>
                                </>
                            )
                        ) : (
                            <div>
                                <i className='bi bi-clock loggedout'></i> Você
                                precisa estar logado para agendar!
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
