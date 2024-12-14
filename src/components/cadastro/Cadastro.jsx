import { Link } from 'react-router';
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
function Cadastro({ onClose }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const nome = event.target.nome.value;
        const date = event.target.date.value;
        const turma = event.target.turma.value;

        // Envie os dados para o servidor para autenticação
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Nome:', nome);
        console.log('Date:', date);
        console.log('Turma:', turma);
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
                <Link to='/'>
                    <i onClick={onClose} className='bi bi-x exit'></i>
                </Link>

                <div className='login__header'>
                    <h2>Cadastre-se</h2>
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
                <div className='login__input'>
                    <label htmlFor='nome'>Nome Complete</label>
                    <input
                        type='text'
                        id='nome'
                        name='nome'
                        placeholder='Digite seu nome completo'
                    />
                </div>
                <div className='login__input'>
                    <label htmlFor='date'>Data de Nascimento</label>
                    <input type='date' id='date' name='date' />
                </div>
                <div className='login__input'>
                    <label htmlFor='turma'>Turma</label>
                    <input
                        type='text'
                        id='turma'
                        name='turma'
                        placeholder='Digite sua turma'
                    />
                </div>

                <button type='submit' className='button-black'>
                    Cria Conta
                </button>
                <span className='login__registrar'>
                    <Link to='/'>Já tem Uma conta?</Link>
                </span>
            </div>
        </form>
    );
}

export default Cadastro;
