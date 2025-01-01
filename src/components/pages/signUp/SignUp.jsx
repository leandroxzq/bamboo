import { Link } from 'react-router';
import { useState } from 'react';

import Swal from 'sweetalert2';

import '../../../assets/style/Modal.scss';

function Cadastro() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        dob: '',
        turma: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email.endsWith('@discente.ifpe.edu.br')) {
            Swal.fire({
                title: `O email deve ser do domínio @discente.ifpe.edu.br`,
                icon: 'error',
            });

            return;
        }

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                Swal.fire({
                    title: `Cadastro realizado com sucesso!`,
                    icon: 'error',
                });

                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    dob: '',
                    turma: '',
                });
            } else {
                const data = await response.json();

                if (data.code === 'ER_DUP_ENTRY') {
                    Swal.fire({
                        title: `Email já cadastrado`,
                        icon: 'error',
                    });
                }
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

    return (
        <div className='background-form'>
            <form className='form-login' onSubmit={handleSubmit}>
                <div className='login'>
                    <Link to='/login'>
                        <i className='bi bi-x exit'></i>
                    </Link>

                    <div className='login__header'>
                        <h2>Cadastre-se</h2>
                    </div>
                    <div className='login__input'>
                        <label htmlFor='name'>Nome Completo</label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            placeholder='Digite seu nome completo'
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='login__input'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='text'
                            id='email'
                            name='email'
                            placeholder='Digite seu email'
                            value={formData.email}
                            onChange={handleChange}
                            required
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
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <i className={eye} onClick={togglePassword}></i>
                        </div>
                    </div>

                    <div className='login__input'>
                        <label htmlFor='date'>Data de Nascimento</label>
                        <input
                            type='date'
                            id='dob'
                            name='dob'
                            value={formData.dob}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='login__input'>
                        <label htmlFor='turma'>Turma</label>
                        <input
                            type='text'
                            id='turma'
                            name='turma'
                            placeholder='Digite sua turma'
                            value={formData.turma}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type='submit' className='button-black'>
                        Cria Conta
                    </button>
                    <span className='login__registrar'>
                        <Link to='/login'>Já tem Uma conta?</Link>
                    </span>
                </div>
            </form>
        </div>
    );
}

export default Cadastro;
