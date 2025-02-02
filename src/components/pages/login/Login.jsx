import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { useAuth } from '../../../auth/AuthContext.jsx';
import { Password } from '../../ui/inputs/Password.jsx';
import { Text } from '../../ui/inputs/Text.jsx';

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

            if (response.ok) {
                const data = await response.json();

                login(data.token, data.role);

                navigate('/home');
            } else {
                setError('Erro ao fazer login. Verifique suas credenciais.');
                return;
            }
        } catch (err) {
            console.log(err);
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

                    <Text
                        label='Email'
                        placeholder='Digite seu email'
                        value={email}
                        onChange={handleEmailChange}
                    />

                    <div className='login__forgot'>
                        <Link
                            to='/recuperar-senha'
                            style={{ textAlign: 'right' }}
                        >
                            Esqueceu ?
                        </Link>
                        <Password
                            label='Senha'
                            placeholder='Digite sua senha'
                            value={password}
                            onChange={handlePasswordChange}
                        />
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
