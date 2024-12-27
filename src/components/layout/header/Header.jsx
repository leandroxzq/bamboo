import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../../auth/AuthContext.jsx';
import { Tooltip } from 'react-tooltip';

import Logo from '../../ui/Logo.jsx';
import './Header.scss';

function Header() {
    const { role, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

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
                    {role === null ? (
                        <Link to={'/login'}>
                            <i className='bi bi-person-circle'></i>
                        </Link>
                    ) : (
                        <Link to={'/perfil'}>
                            <i className='bi bi-person-circle'></i>
                        </Link>
                    )}

                    {role === 'admin' && (
                        <Link to={'/criar-postagem'}>
                            <i
                                className='bi bi-pencil-square'
                                data-tooltip-id='post-tooltip'
                                data-tooltip-content='Criar um novo post'
                            ></i>
                            <Tooltip id='post-tooltip' />
                        </Link>
                    )}

                    {role !== null ? (
                        role === 'admin' ? (
                            // Botão específico para o admin
                            <Link to={'/agendados'}>
                                <i
                                    className='bi bi-card-checklist'
                                    data-tooltip-id='admin-tooltip'
                                    data-tooltip-content='Consultas agendadas'
                                ></i>
                                <Tooltip id='admin-tooltip' />
                            </Link>
                        ) : (
                            // Botão normal para usuário logado
                            <Link to={'/agendamento'}>
                                <i
                                    className='bi bi-clock'
                                    data-tooltip-id='clock-tooltip'
                                    data-tooltip-content='Agendar uma consulta'
                                ></i>
                                <Tooltip id='clock-tooltip' />
                            </Link>
                        )
                    ) : (
                        <>
                            <i
                                className='bi bi-clock loggedout'
                                data-tooltip-id='clock-tooltip'
                                data-tooltip-content='Você precisa estar logado para agendar!'
                            ></i>
                            <Tooltip id='clock-tooltip' />
                        </>
                    )}

                    {role !== null && (
                        <>
                            <i
                                className='bi bi-box-arrow-right'
                                onClick={handleLogout}
                                data-tooltip-id='exit-tooltip'
                                data-tooltip-content='Sair'
                            ></i>
                            <Tooltip id='exit-tooltip' />
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
