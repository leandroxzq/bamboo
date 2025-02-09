import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

import Swal from 'sweetalert2';
import { LoaderCircle } from 'lucide-react';

import Logo from '../../ui/Logo';
import { Password } from '../../ui/inputs/Password';
import { Text } from '../../ui/inputs/Text';
import { DataPicker } from '../../ui/inputs/DataPicker';
import '../../../assets/style/Modal.scss';

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [date, setDate] = useState(null);
    const [room, setRoom] = useState('');
    const [studentID, setStudentID] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.endsWith('@discente.ifpe.edu.br')) {
            Swal.fire({
                title: `O email deve ser do domínio @discente.ifpe.edu.br`,
                icon: 'error',
            });
            return;
        }

        if (
            email === '' ||
            password === '' ||
            name === '' ||
            date === null ||
            room === '' ||
            studentID === ''
        ) {
            Swal.fire({
                title: `Preencha todos os campos!`,
                icon: 'error',
            });
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/register`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                        date,
                        room,
                        studentID,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    title: `${data.message}`,
                    icon: 'success',
                });

                navigate('/login');
            } else {
                if (!response.ok) {
                    Swal.fire({
                        title: `Email já cadastrado`,
                        icon: 'error',
                    });
                }
            }
        } catch (e) {
            console.log(e);
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
                            <span>C</span>
                            <span>a</span>
                            <span>d</span>
                            <span>a</span>
                            <span>s</span>
                            <span>t</span>
                            <span style={{ animationDelay: '0.7s' }}>r</span>
                            <span style={{ animationDelay: '0.8s' }}>e</span>
                            <span style={{ animationDelay: '0.9s' }}>-</span>
                            <span style={{ animationDelay: '1s' }}>s</span>
                            <span style={{ animationDelay: '1.1s' }}>e</span>
                        </h1>
                    </div>
                    <Text
                        id='name'
                        label='Nome completo'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Digite seu nome completo'
                    />
                    <Text
                        id='email'
                        label='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Digite seu email'
                    />

                    <Password
                        id='password'
                        label='Senha'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Digite sua senha'
                    />

                    <Text
                        id='room'
                        label='Turma'
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                        placeholder='Digite sua turma'
                    />

                    <Text
                        id='studentID'
                        label='Matrícula'
                        value={studentID}
                        onChange={(e) => setStudentID(e.target.value)}
                        placeholder='Digite sua matrícula'
                    />

                    <DataPicker
                        label='Data de nascimento'
                        value={date}
                        onChange={(e) => setDate(e)}
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
                    <span className='login__registrar'>
                        <Link to='/login'>Já tem uma conta?</Link>
                    </span>
                </div>
            </form>
        </div>
    );
}

export default SignUp;
