import { useEffect, useState } from 'react';

import Header from '../../layout/header/Header.jsx';
import Footer from '../../layout/footer/Footer.jsx';

import Swal from 'sweetalert2';

import './AppointmentsList.scss';

function Agendados() {
    const [appointments, setAppointments] = useState([]);

    const fetchAppointments = async () => {
        try {
            const response = await fetch('http://localhost:5000/appointments');
            if (response.ok) {
                const data = await response.json();
                setAppointments(data.appointments);
            } else {
                console.error('Erro ao buscar agendamentos.');
            }
        } catch (error) {
            console.error('Erro ao buscar agendamentos:', error);
        }
    };

    const removeAll = async () => {
        const result = await Swal.fire({
            text: 'Tem certeza de que deseja limpar todas as configurações?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Não',
            confirmButtonText: 'Sim',
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(
                    'http://localhost:5000/appointments',
                    {
                        method: 'DELETE',
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );

                if (response.ok) {
                    Swal.fire({
                        title: 'Deletado!',
                        text: 'Todos os agendamentos foram removidos do banco de dados.',
                        icon: 'success',
                    });
                    setAppointments([]);
                    fetchAppointments();
                }
            } catch (e) {
                console.error(`Erro na requisição: ${e.message}`);
            }
        }
    };

    function calculateAge(date) {
        const birthDate = new Date(date);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();

        const hasHadBirthdayThisYear =
            today.getMonth() > birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() &&
                today.getDate() >= birthDate.getDate());

        if (!hasHadBirthdayThisYear) {
            age--;
        }

        return age;
    }

    function formatTime(time) {
        return time.split(':').slice(0, 2).join(':');
    }

    function formatDate(isoDate) {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    }

    useEffect(() => {
        fetchAppointments();
    }, []);

    return (
        <>
            <Header />

            <div className='agendados'>
                <h1
                    style={{
                        textAlign: 'center',
                        width: '100%',
                        margin: '4rem 0 0 0',
                    }}
                >
                    Consultas Marcadas
                </h1>
                <button className='button-black' onClick={removeAll}>
                    Apagar todas
                </button>
                <div className='agendados-container'>
                    {appointments.map((appointment) => {
                        return (
                            <div
                                className='agendados-container__card'
                                key={appointment.id}
                            >
                                <h2> {appointment.name} </h2>
                                <p>Turma: {appointment.turma}</p>
                                <p>Idade: {calculateAge(appointment.dob)}</p>
                                <p>Data: {formatDate(appointment.date)}</p>
                                <p>Horário: {formatTime(appointment.time)}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Agendados;
