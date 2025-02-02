import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Password } from '../../ui/inputs/Password';
import { Text } from '../../ui/inputs/Text';
import { DataPicker } from '../../ui/inputs/DataPicker';

import Logo from '../../ui/Logo.jsx';
import { formatDate } from '../../../utils/Date.js';
import '../../../assets/style/Modal.scss';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [birthdate, setDob] = useState(null);
    const [newPassword, setPassword] = useState('');

    const [message, setMessage] = useState('');
    const [cleared, setCleared] = useState(false);

    useEffect(() => {
        if (cleared) {
            const timeout = setTimeout(() => {
                setCleared(false);
            }, 1500);

            return () => clearTimeout(timeout);
        }
        return () => {};
    }, [cleared]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedDob = formatDate(birthdate);

        try {
            const response = await fetch(
                'http://localhost:5000/forgot-password',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email,
                        birthdate: formattedDob,
                        newPassword,
                    }),
                }
            );

            const data = await response.json();
            setMessage(data.message);
        } catch (e) {
            console.log(e);
            setMessage('Erro ao enviar solicitação.');
        }
    };

    return (
        <div className='background-form'>
            <form className='form-login' onSubmit={handleSubmit}>
                <div className='login'>
                    <Link to='/login'>
                        <i className='bi bi-x exit'></i>
                    </Link>
                    <div className='login__header'>
                        <Logo></Logo>
                        <h1>Recuperar Senha</h1>
                    </div>
                    <p>{message}</p>

                    <Text
                        id='email'
                        label='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Digite seu email'
                    />

                    <DataPicker
                        label='Data de nascimento'
                        value={birthdate}
                        onChange={(e) => setDob(e)}
                    />
                    <Password
                        id='password'
                        label='Nova senha'
                        value={newPassword}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Digite sua nova senha'
                    />

                    <button type='submit' className='button-black'>
                        Alterar senha
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ForgotPassword;
