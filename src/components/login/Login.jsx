import { useState } from 'react';
import Logo from '../Logo';
import { Link } from 'react-router';

// eslint-disable-next-line react/prop-types
function Login({ onClose }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        // Envie os dados para o servidor para autenticação
        console.log('Email:', email);
        console.log('Password:', password);
    };

    const [passwordType, setPasswordType] = useState('password');
    const [eye, setBiType] = useState('bi bi-eye-slash');

    const togglePassword = () => {
        setPasswordType(passwordType === 'password' ? 'text' : 'password');
        setBiType(eye === 'bi bi-eye-slash' ? 'bi bi-eye' : 'bi bi-eye-slash');
    };

    return (
        <form className='form-login' onSubmit={handleSubmit}>
            <div className='login'>
                <i onClick={onClose} className='bi bi-x exit'></i>
                <div className='login__header'>
                    <Logo />
                </div>
                <div className='login__input'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='text'
                        id='email'
                        name='email'
                        placeholder='Digite seu email'
                    />
                </div>
                <div className='login__input'>
                    <div className='login__input__container'>
                        <label htmlFor='password'>Senha</label>
                        <Link to='/esqueceu'>Esqueceu ?</Link>
                    </div>
                    <div className='password-container'>
                        <input
                            type={passwordType}
                            className='password-style'
                            id='password'
                            name='password'
                            placeholder='Digite sua senha'
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
    );
}

export default Login;
