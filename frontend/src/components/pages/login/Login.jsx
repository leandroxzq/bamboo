import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { LoaderCircle, KeyRound } from 'lucide-react';

import { useAuth } from '../../../auth/AuthContext.jsx';
import { Password } from '../../ui/inputs/Password.jsx';
import { Text } from '../../ui/inputs/Text.jsx';

import Logo from '../../ui/Logo.jsx';
import '../../../assets/style/Modal.scss';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                }
            );

            if (response.ok) {
                const data = await response.json();

                login(data.token, data.role);

                navigate('/blog');
            } else {
                setError('Erro ao fazer login. Verifique suas credenciais.');
                return;
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError(null);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setError(null);
    };

    const [info, setInfo] = useState(false);

    const toggleInfo = () => {
        setInfo(true);
        if (info === true) {
            setInfo(false);
        }
    };

    return (
        <div className='background-form'>
            <form className='form-login' onSubmit={handleSubmit}>
                {info && (
                    <aside className='credentials'>
                        <div className='credentials__card'>
                            <span>Admin</span>
                            <span>Usuário: psicologa</span>
                            <span>Senha: 123</span>
                        </div>
                        <div className='credentials__card'>
                            <span>Aluno</span>
                            <span>Usuário: aluno@discente.ifpe.edu.br</span>
                            <span>Senha: 123</span>
                        </div>
                    </aside>
                )}
                <div className='login'>
                    <KeyRound
                        className=''
                        data-tooltip-id='login-tooltip'
                        onClick={toggleInfo}
                        style={{ cursor: 'pointer' }}
                    />

                    <Link to='/blog'>
                        <i className='bi bi-x exit'></i>
                    </Link>
                    <div className='login__header'>
                        <Link to={'/blog'}>
                            <Logo />
                            <h1 className='header__title'>
                                <span>B</span>
                                <span>a</span>
                                <span>m</span>
                                <span>b</span>
                                <span>o</span>
                                <span>o</span>
                            </h1>
                        </Link>
                    </div>

                    {error && (
                        <p style={{ color: 'red', textAlign: 'center' }}>
                            {error}
                        </p>
                    )}

                    <Text
                        label='Email'
                        placeholder='Digite seu email'
                        value={email}
                        onChange={handleEmailChange}
                    />

                    <div className='login__forgot'>
                        <span style={{ textAlign: 'right' }}>
                            <Link to='/recuperar-senha'>Esqueceu ?</Link>
                        </span>
                        <Password
                            label='Senha'
                            placeholder='Digite sua senha'
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>

                    <button type='submit' className='button-black'>
                        {loading ? (
                            <LoaderCircle
                                style={{
                                    strokeWidth: 3,
                                }}
                                className='loading'
                            />
                        ) : (
                            'Entrar'
                        )}
                    </button>
                    <span className='login__registrar'>
                        Não Tem Uma Conta?{' '}
                        <Link to='/cadastre-se'>Cadastre-se</Link>
                    </span>
                </div>
            </form>
        </div>
    );
}

export default Login;
