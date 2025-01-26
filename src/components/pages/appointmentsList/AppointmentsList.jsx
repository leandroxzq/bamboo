import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper } from '@mui/material';

import Swal from 'sweetalert2';

import './AppointmentsList.scss';

function Agendados() {
    const [appointments, setAppointments] = useState([]);

    const fetchAppointments = async () => {
        try {
            const response = await fetch('http://localhost:5000/scheduled', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data.appointments);
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
                    'http://localhost:5000/scheduled',
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

    const columns = [
        { field: 'id', headerName: 'Ordem', width: 70 },
        { field: 'nomecompleto', headerName: 'Nome completo', width: 300 },
        { field: 'turma', headerName: 'Turma', width: 100 },
        {
            field: 'idade',
            headerName: 'Idade',
            type: 'number',
            width: 70,
        },
        { field: 'data', headerName: 'Data', width: 130 },
        { field: 'horario', headerName: 'Horário', width: 130 },
    ];

    const rows = appointments.map((appointment) => ({
        id: appointment.id,
        nomecompleto: appointment.name,
        turma: appointment.turma,
        idade: calculateAge(appointment.dob),
        data: formatDate(appointment.date),
        horario: formatTime(appointment.time),
    }));

    const paginationModel = { page: 0, pageSize: 5 };

    useEffect(() => {
        fetchAppointments();
    }, []);

    return (
        <div className='agendados'>
            <div className='agendados__wrapper'>
                <h2>Consultas agendadas</h2>
                <div className='agendados__button'>
                    <button className='button-black' onClick={removeAll}>
                        Apagar todas
                    </button>
                </div>
                <Paper
                    sx={{
                        minHeight: '369px',
                        width: '100%',
                        marginTop: '1rem',
                    }}
                >
                    <DataGrid
                        sx={{
                            minHeight: '369px',
                            border: 0,
                        }}
                        rows={rows}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                    />
                </Paper>
            </div>
        </div>
    );
}

export default Agendados;
