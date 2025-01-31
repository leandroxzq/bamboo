import { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Swal from 'sweetalert2';

import { formattedDateUser } from '../../../Date';

import './Profile.scss';

export function Profile() {
    const [profile, setProfile] = useState(null);

    const handleProfile = async () => {
        try {
            const response = await fetch('http://localhost:5000/profile', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            setProfile(data);
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
                    `http://localhost:5000/appointments/${id}`,
                    {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );

                if (response.ok) {
                    Swal.fire({
                        title: 'Deletado!',
                        text: 'Agendamento cancelado',
                        icon: 'success',
                    });
                }

                setProfile((prevProfile) => ({
                    ...prevProfile,
                    appointments: prevProfile.appointments.filter(
                        (a) => a.id !== id
                    ),
                }));
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
                                Turma: {profile.turma}
                            </p>
                            <p>Email: {profile.email}</p>
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
                        {profile ? (
                            profile.appointments.length > 0 ? (
                                profile.appointments.map((appointment) => (
                                    <div key={appointment.id}>
                                        <p>
                                            Data:{' '}
                                            {formattedDateUser(
                                                appointment.date
                                            )}
                                        </p>
                                        <p>Hora: {appointment.time}</p>
                                        <p>
                                            Status: {appointment.status}
                                            {appointment.status ===
                                                'pendente' && (
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            appointment.id
                                                        )
                                                    }
                                                >
                                                    <i className='bi bi-trash3-fill'></i>
                                                </button>
                                            )}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p>Você não tem agendamentos.</p>
                            )
                        ) : (
                            <>
                                <Skeleton width='100%' height={200} />
                            </>
                        )}
                    </article>
                </section>
            </section>
        </section>
    );
}
