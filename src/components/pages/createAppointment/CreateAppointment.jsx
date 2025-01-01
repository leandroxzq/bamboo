import { Link, useNavigate } from 'react-router';
import { useState } from 'react';

import Swal from 'sweetalert2';

import List from '../../ui/ListAvaibality/ListAvaibality.jsx';

import '../../../assets/style/Modal.scss';

function Create() {
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);

    const navigate = useNavigate();

    const handleDate = (newData) => setDate(newData);
    const handleTime = (newTime) => setTime(newTime);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/schedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ date, time }),
            });

            if (response.ok) {
                Swal.fire({
                    title: `Disponibilidade salva com sucesso`,
                    icon: 'success',
                });
                navigate('/home');
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className='background-form'>
            <form className='form-login' onSubmit={handleSubmit}>
                <div className='login'>
                    <Link to={'/home'}>
                        <i className='bi bi-x exit'></i>
                    </Link>
                    <div className='create'>
                        <h2 className='create__title'>Agendamento</h2>
                        <List sendDate={handleDate} sendTime={handleTime} />
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
