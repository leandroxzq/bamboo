import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';

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
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/forgot-password`,
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
        } finally {
            setLoading(false);
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
                        <h1 className='header__title'>
                            <span>A</span>
                            <span>l</span>
                            <span>t</span>
                            <span>e</span>
                            <span>r</span>
                            <span>a</span>
                            <span style={{ animationDelay: '0.7s' }}>r</span>
                            <span
                                style={{
                                    animationDelay: '0.1s',
                                    marginLeft: '10px',
                                }}
                            >
                                s
                            </span>
                            <span style={{ animationDelay: '0.2s' }}>e</span>
                            <span style={{ animationDelay: '0.3s' }}>n</span>
                            <span style={{ animationDelay: '0.4s' }}>h</span>
                            <span style={{ animationDelay: '0.5s' }}>a</span>
                        </h1>
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
                        {loading ? (
                            <LoaderCircle
                                style={{
                                    strokeWidth: 3,
                                }}
                                className='loading'
                            />
                        ) : (
                            'Cadastrar'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ForgotPassword;
