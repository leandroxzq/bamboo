import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../../auth/AuthContext.jsx';

import Logo from '../../ui/Logo.jsx';
import '../../../assets/style/Modal.scss';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isValid, setIsValid] = useState(true);

    const validateForm = () => {
        if (
            email === '' &&
            !email.endsWith('@discente.ifpe.edu.br') &&
            password === ''
        ) {
            setIsValid(false);
            return false;
        } else {
            setIsValid(true);
            return true;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();

            login(data.token, data.role);

            navigate('/home');
        } catch (err) {
            setIsValid(false);
            //setError('Erro ao fazer login. Verifique suas credenciais.');

            if (err === 'email') {
                alert('Email invalkido');
            }
        }
    };

    const [passwordType, setPasswordType] = useState('password');
    const [eye, setBiType] = useState('bi bi-eye-slash');

    const togglePassword = () => {
        setPasswordType(passwordType === 'password' ? 'text' : 'password');
        setBiType(eye === 'bi bi-eye-slash' ? 'bi bi-eye' : 'bi bi-eye-slash');
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError(null);
        setIsValid(true);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setError(null);
        setIsValid(true);
    };

    return (
        <div className='background-form'>
            <form className='form-login' onSubmit={handleSubmit}>
                <div className='login'>
                    <Link to='/home'>
                        <i className='bi bi-x exit'></i>
                    </Link>
                    <div className='login__header'>
                        <Link to={'/home'}>
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

                    <div className='login__input'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='text'
                            id='email'
                            name='email'
                            placeholder='Digite seu email'
                            value={email}
                            style={{
                                borderColor: isValid ? '#888888' : 'red',
                                borderWidth: isValid ? '1px' : '2px',
                            }}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className='login__input'>
                        <div className='login__input__container'>
                            <label htmlFor='password'>Senha</label>
                            <Link to='/recuperar-senha'>Esqueceu ?</Link>
                        </div>
                        <div
                            className='password-container'
                            style={{
                                borderColor: isValid ? '#888888' : 'red',
                                borderWidth: isValid ? '1px' : '2px',
                            }}
                        >
                            <input
                                type={passwordType}
                                className='password-style'
                                id='password'
                                name='password'
                                placeholder='Digite sua senha'
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <i className={eye} onClick={togglePassword}></i>
                        </div>
                    </div>
                    <button type='submit' className='button-black'>
                        Entrar
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
