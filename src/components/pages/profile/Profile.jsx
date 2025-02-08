import { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Swal from 'sweetalert2';

import { formattedDateUser } from '../../../utils/Date';

import './Profile.scss';
import { data } from 'react-router-dom';

export function Profile() {
    const [profile, setProfile] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [haveAppointments, setHaveAppointments] = useState(false);

    const handleProfile = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/profile`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            const data = await response.json();
            setProfile(data.infos);

            if (data.appointments[0].date !== null) {
                setHaveAppointments(true);
            }

            setAppointments(data.appointments);
        } catch (e) {
            console.log(e);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            text: 'Confirma o cancelamento do agendamento?',
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
                    `${import.meta.env.VITE_API_URL}/appointments/${id}`,
                    {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    Swal.fire({
                        title: 'Deletado!',
                        text: `${data.message}`,
                        icon: 'success',
                    });
                    handleProfile();
                } else {
                    Swal.fire({
                        title: 'Erro!',
                        text: `${data.message}`,
                        icon: 'error',
                    });
                }
            } catch (e) {
                console.log(e);
            }
        }
    };

    useEffect(() => {
        handleProfile();
    }, []);

    return (
        <section className='profile'>
            <section className='profile__card'>
                <div className='profile__card__data'>
                    {profile ? (
                        <>
                            <div className='profile__card__data__header'>
                                <i className='bi bi-person-circle profile__card__image'></i>
                                <h1 className='profile__card__name'>
                                    {profile.name}
                                </h1>
                            </div>
                            <p className='profile__card__turma'>
                                Turma: {profile.class}
                            </p>
                            <p>Email: {profile.email}</p>
                            <p>Matrícula: {profile.studentID}</p>
                        </>
                    ) : (
                        <>
                            <div className='profile__card__data__header'>
                                <Skeleton
                                    variant='circular'
                                    width={50}
                                    height={50}
                                />
                                <Skeleton
                                    animation='wave'
                                    width={200}
                                    height={30}
                                />
                            </div>

                            <Skeleton
                                animation='wave'
                                width={150}
                                height={30}
                            />
                            <Skeleton
                                animation='wave'
                                width={150}
                                height={30}
                            />
                        </>
                    )}
                </div>

                <section className='profile__appointments'>
                    <h2>Seus agendamentos</h2>
                    <article>
                        {haveAppointments && appointments.length > 0 ? (
                            appointments.map((appointment) => (
                                <div key={appointment.id}>
                                    <p>
                                        <strong>Data: </strong>
                                        {formattedDateUser(appointment.date)}
                                    </p>
                                    <p>
                                        <strong>Hora: </strong>
                                        {appointment.time}
                                    </p>
                                    <p>
                                        <strong>Status: </strong>
                                        {appointment.status}
                                        {appointment.status === 'pendente' && (
                                            <button
                                                onClick={() =>
                                                    handleDelete(appointment.id)
                                                }
                                            >
                                                <i className='bi bi-trash3-fill'></i>
                                            </button>
                                        )}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>Não tem agendamentos</p>
                        )}
                    </article>
                </section>
            </section>
        </section>
    );
}
