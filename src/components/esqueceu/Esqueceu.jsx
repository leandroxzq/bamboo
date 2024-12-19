import { Link } from 'react-router';

import '../Modal.scss';

function Esqueceu() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;

        // Envie os dados para o servidor para autenticação
        console.log('Email:', email);
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
                    <div className='login__input'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='text'
                            id='email'
                            name='email'
                            placeholder='Digite seu email'
                        />
                    </div>

                    <button type='submit' className='button-black'>
                        Enviar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Esqueceu;
