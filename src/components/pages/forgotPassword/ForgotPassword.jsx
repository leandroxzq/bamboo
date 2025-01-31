import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

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
                        <h2>Recuperar Senha</h2>
                    </div>
                    <p>{message}</p>
                    <div className='login__input'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            placeholder='Digite seu e-mail'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <span>Data de Nascimento</span>
                        <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            adapterLocale='en-gb'
                        >
                            <DesktopDatePicker
                                sx={{
                                    width: '100%',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#888888',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#000',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#888888',
                                        },
                                    },
                                }}
                                value={birthdate}
                                onChange={(newValue) => setDob(newValue)}
                                slotProps={{
                                    field: {
                                        clearable: true,
                                        onClear: () => setCleared(true),
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className='login__input'>
                        <label htmlFor='password'>Nova senha</label>
                        <input
                            type='password'
                            placeholder='Digite sua nova senha'
                            value={newPassword}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type='submit' className='button-black'>
                        Alterar senha
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ForgotPassword;
