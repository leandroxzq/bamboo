import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, Select, MenuItem, FormControl } from '@mui/material';
import { ptBR } from '@mui/x-data-grid/locales';
import { useTheme, useMediaQuery } from '@mui/material';

import Swal from 'sweetalert2';

import { formattedDateUser, formatTime, calculateAge } from '../../../Date.js';

import './AppointmentsList.scss';

function Scheduled() {
    const [appointments, setAppointments] = useState([]);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await fetch(
                `http://localhost:5000/scheduled/${id}`,
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
        { field: 'id', headerName: 'Ordem', width: isMobile ? 50 : 70 },
        {
            field: 'nomecompleto',
            headerName: 'Nome completo',
            width: isMobile ? 150 : 250,
        },
        { field: 'turma', headerName: 'Turma', width: isMobile ? 50 : 100 },
        {
            field: 'idade',
            headerName: 'Idade',
            width: isMobile ? 70 : 120,
        },
        { field: 'data', headerName: 'Data', width: isMobile ? 90 : 130 },
        {
            field: 'horario',
            headerName: 'Horário',
            width: isMobile ? 70 : 160,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: isMobile ? 120 : 160,
            renderCell: (params) => (
                <FormControl fullWidth>
                    <Select
                        sx={{
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
                        }}
                        value={params.row.status}
                        onChange={(e) =>
                            handleStatusChange(params.row.id, e.target.value)
                        }
                    >
                        <MenuItem value='pendente'>Pendente</MenuItem>
                        <MenuItem value='concluído'>Concluído</MenuItem>
                        <MenuItem value='cancelado'>Cancelado</MenuItem>
                    </Select>
                </FormControl>
            ),
        },
    ];

    const rows = appointments.map((appointment) => ({
        id: appointment.id,
        nomecompleto: appointment.name,
        turma: appointment.turma,
        idade: calculateAge(appointment.dob),
        data: formattedDateUser(appointment.date),
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
                    width: '100%',
                    maxWidth: '990px',
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
                            backgroundColor: '#000',
                            color: '#fff',
                        },
                        '.MuiDataGrid-cell': {
                            fontSize: '14px',
                        },
                        '& .MuiDataGrid-row:nth-of-type(odd)': {
                            backgroundColor: '#fff',
                        },
                        '& .MuiDataGrid-row:nth-of-type(even)': {
                            backgroundColor: '#f5f5f5',
                        },
                        '@media (max-width: 600px)': {
                            fontSize: '12px',
                            '& .MuiDataGrid-cell': {
                                padding: '8px',
                            },
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
