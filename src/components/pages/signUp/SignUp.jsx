import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

import Swal from 'sweetalert2';

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
                        <h1>Cadastre-se</h1>
                    </div>
                    <Text
                        id='name'
                        label='Nome Completo'
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
                        Cria Conta
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
