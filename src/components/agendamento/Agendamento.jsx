import { Link } from 'react-router';

import './Agendamento.scss';
import '../Modal.scss';

function criar() {
    return (
        <div className='background-form'>
            <form className='form-login'>
                <div className='login'>
                    <Link to={'/home'}>
                        <i className='bi bi-x exit'></i>
                    </Link>

                    <div className='login__header'>
                        <h2>Agendamento</h2>
                    </div>
                    <div className='login__input'>
                        <label htmlFor='email'>Datas Disponíveis</label>
                        <select name='' id=''>
                            <option value=''></option>
                            <option value=''></option>
                            <option value=''></option>
                        </select>
                    </div>
                    <div className='login__input'>
                        <label htmlFor='email'>Horários Disponíveis</label>
                        <select name='' id=''>
                            <option value=''></option>
                            <option value=''></option>
                            <option value=''></option>
                        </select>
                    </div>

                    <button type='submit' className='button-black'>
                        Confirmar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default criar;
