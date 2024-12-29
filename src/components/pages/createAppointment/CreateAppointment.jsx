import { Link } from 'react-router';

import List from '../../ui/ListAvaibality/ListAvaibality.jsx';

import '../../../assets/style/Modal.scss';

function Create() {
    return (
        <div className='background-form'>
            <form className='form-login'>
                <div className='login'>
                    <Link to={'/home'}>
                        <i className='bi bi-x exit'></i>
                    </Link>
                    <div className='create'>
                        <h2 className='create__title'>Agendamento</h2>
                        <List />
                        <button type='submit' className='button-black'>
                            Confirmar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Create;
