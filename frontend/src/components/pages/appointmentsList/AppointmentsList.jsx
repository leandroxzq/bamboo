import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, Select, MenuItem, FormControl } from '@mui/material';
import { ptBR } from '@mui/x-data-grid/locales';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

import { formatTime, calculateAge } from '../../../utils/Date';

import './AppointmentsList.scss';

function Scheduled() {
    const [appointments, setAppointments] = useState([]);

    const fetchAppointments = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/scheduled`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
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

    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/scheduled/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ status: newStatus }),
                }
            );

            if (response.ok) {
                setAppointments((prevAppointments) =>
                    prevAppointments.map((appointment) =>
                        appointment.id === id
                            ? { ...appointment, status: newStatus }
                            : appointment
                    )
                );
                Swal.fire('Status atualizado!', '', 'success');
            } else {
                console.error('Erro ao atualizar o status.');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    const columns = [
        {
            field: 'id',
            headerName: 'Ordem',
            flex: 1,
            minWidth: 50,
        },
        {
            field: 'studentID',
            headerName: 'Matrícula',
            flex: 1,
            minWidth: 130,
        },
        {
            field: 'nomecompleto',
            headerName: 'Nome completo',
            flex: 1,
            minWidth: 180,
        },
        { field: 'turma', headerName: 'Turma', flex: 1, minWidth: 120 },
        {
            field: 'idade',
            headerName: 'Idade',
            flex: 1,
            minWidth: 60,
        },
        { field: 'data', headerName: 'Data', flex: 1, minWidth: 100 },
        {
            field: 'horario',
            headerName: 'Horário',
            flex: 1,
            minWidth: 80,
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 2,
            minWidth: 250,

            renderCell: (params) => (
                <FormControl fullWidth>
                    <Select
                        sx={{
                            flex: 1,
                            minWidth: 150,
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                            '& .MuiSelect-select': {
                                display: 'flex',
                                padding: '12px 0px',
                                textAlign: 'center',
                            },
                            '@media (max-width: 1024px)': {
                                fontSize: '12px',
                            },
                        }}
                        value={params.row.status}
                        onChange={(e) =>
                            handleStatusChange(params.row.id, e.target.value)
                        }
                    >
                        <MenuItem value='pendente'>Pendente</MenuItem>
                        <MenuItem value='concluído'>Concluído</MenuItem>
                        <MenuItem value='cancelado'>Cancelado</MenuItem>
                        <MenuItem value='cancelado pelo usuário' disabled>
                            Cancelado pelo usuário
                        </MenuItem>
                    </Select>
                </FormControl>
            ),
        },
    ];

    const rows = appointments.map((appointment) => ({
        id: appointment.id,
        studentID: appointment.studentID,
        nomecompleto: appointment.name,
        turma: appointment.class,
        idade: calculateAge(appointment.dob),
        data: dayjs(appointment.date).format('DD/MM/YYYY'),
        horario: formatTime(appointment.time),
        status: appointment.status,
    }));

    const paginationModel = { page: 0, pageSize: 5 };

    useEffect(() => {
        fetchAppointments();
    }, []);

    return (
        <div className='scheduled'>
            <h2>Histórico de consultas</h2>

            <Paper
                sx={{
                    width: '60vw',
                    '@media (max-width: 1024px)': {
                        width: '90vw',
                        padding: '0px',
                    },
                    marginTop: '1rem',
                    margin: '0 auto',
                    padding: '10px',
                }}
            >
                <DataGrid
                    localeText={
                        ptBR.components.MuiDataGrid.defaultProps.localeText
                    }
                    sx={{
                        minHeight: '400px',
                        border: 0,
                        '.MuiDataGrid-root': {
                            borderRadius: '10px',
                            backgroundColor: '#fff',
                        },
                        '.MuiDataGrid-columnHeader': {
                            backgroundColor: '#00000086',
                            color: '#fff',
                            '@media (max-width: 1024px)': {
                                fontSize: '12px',
                            },
                        },
                        '.MuiDataGrid-columnHeader .MuiDataGrid-columnHeaderTitle .MuiDataGrid-iconButtonContainer .MuiDataGrid-cell:hover':
                            {
                                color: '#fff',
                            },
                        '.MuiDataGrid-cell': {
                            textAlign: 'center',
                            '@media (max-width: 1024px)': {
                                fontSize: '12px',
                            },
                        },
                        '& .MuiDataGrid-row:nth-of-type(odd)': {
                            backgroundColor: '#fff',
                        },
                        '& .MuiDataGrid-row:nth-of-type(even)': {
                            backgroundColor: '#f5f5f5',
                        },
                    }}
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    hideFooterPagination={false}
                />
            </Paper>
        </div>
    );
}

export default Scheduled;
