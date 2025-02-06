import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';

import { Password } from '../../ui/inputs/Password';
import { Text } from '../../ui/inputs/Text';

import Logo from '../../ui/Logo.jsx';
import '../../../assets/style/Modal.scss';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [studentID, setStudentID] = useState(null);
    const [newPassword, setPassword] = useState('');

    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                'http://localhost:5000/forgot-password',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email,
                        studentID,
                        newPassword,
                    }),
                }
            );

            const data = await response.json();
            if (response.ok) {
                Swal.fire({
                    title: `Senha alterada com sucesso!`,
                    icon: 'success',
                });
                navigate('/login');
            } else {
                setMessage(data.message);
            }
        } catch (e) {
            console.log(e);
            setMessage(data.message);
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
                        <h1>Alterar senha</h1>
                    </div>
                    <p style={{ color: 'red', textAlign: 'center' }}>
                        {message}
                    </p>

                    <Text
                        id='email'
                        label='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Digite seu email'
                    />

                    <Text
                        id='studentID'
                        label='Matrícula'
                        value={studentID}
                        onChange={(e) => setStudentID(e.target.value)}
                        placeholder='Digite sua matrícula'
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
