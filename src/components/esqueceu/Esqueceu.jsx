import { Link } from 'react-router';

// eslint-disable-next-line react/prop-types
function Esqueceu({ onClose }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;

        // Envie os dados para o servidor para autenticação
        console.log('Email:', email);
    };

    return (
        <form className='form-login' onSubmit={handleSubmit}>
            <div className='login'>
                <Link to='/'>
                    <i onClick={onClose} className='bi bi-x exit'></i>
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
                <span className='login__registrar'>
                    <Link to='/'>Entre Novamente </Link>
                </span>
            </div>
        </form>
    );
}

export default Esqueceu;
