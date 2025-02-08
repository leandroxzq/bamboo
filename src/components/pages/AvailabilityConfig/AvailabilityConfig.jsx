import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, Button, Box, Grid, Chip } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';

import Swal from 'sweetalert2';

import List from '../../ui/listAvaibality/ListAvaibality.jsx';

import './AvailabilityConfig.scss';

const availableTimes = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
];

export function AvailabilityConfig() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimes, setSelectedTimes] = useState([]);

    const [savedDates, setSavedDates] = useState({});

    const [date, setDate] = useState(null);

    const [time, setTime] = useState(null);

    const handleDate = (newData) => setDate(newData);
    const handleTime = (newTime) => setTime(newTime);

    function ClearableProp() {}

    const saveAvailability = async () => {
        const formattedDate = () => dayjs(selectedDate).format('YYYY-MM-DD');
        setSavedDates((prev) => ({
            ...prev,
            [formattedDate]: selectedTimes,
        }));

        const availability = {
            date: formattedDate(selectedDate),
            times: selectedTimes.sort(),
        };

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/availability`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify(availability),
                }
            );

            if (response.ok) {
                const data = await response.json();

                Swal.fire({
                    title: `Disponibilidade salva com sucesso ${formattedDateUser(selectedDate)}, ${selectedTimes}`,
                    icon: 'success',
                });

                setSavedDates(data);
                setSelectedDate(null);
                setSelectedTimes([]);
            } else {
                Swal.fire({
                    title: `Data já configurada no sistema`,
                    icon: 'error',
                });
            }
        } catch (e) {
            Swal.fire({
                title: `Erro na requisição ${e.message}`,
                icon: 'error',
            });
        }
    };

    const clearAvailability = async () => {
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
                    'http://localhost:5000/availability',
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
                        text: 'Todas as disponibilidades foram removidas do banco de dados.',
                        icon: 'success',
                    });

                    setSelectedDate(null);
                    setSelectedTimes([]);
                    setSavedDates(null);
                }
            } catch (e) {
                console.error(`Erro na requisição: ${e.message}`);
            }
        }
    };

    const toggleTimeSelection = (time) => {
        setSelectedTimes((prevTimes) =>
            prevTimes.includes(time)
                ? prevTimes.filter((t) => t !== time)
                : [...prevTimes, time]
        );
    };

    const formattedDateUser = () => dayjs(selectedDate).format('DD-MM-YYYY');

    return (
        <div className='wrapper'>
            <section className='wrapper__section'>
                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale='en-gb'
                    sx={{ padding: 0 }}
                >
                    <Box sx={{ minWidth: '50%' }}>
                        <h2>Configuração de Disponibilidade</h2>
                        <DatePicker
                            sx={{ width: '100%' }}
                            slotProps={{
                                field: {
                                    clearable: true,
                                    onClear: () => ClearableProp,
                                },
                            }}
                            label='Selecione uma data'
                            value={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            renderInput={(params) => (
                                <TextField {...params} fullWidth />
                            )}
                        />
                        <div className='times'>
                            {selectedDate && (
                                <>
                                    <h3>Escolha os Horários Disponíveis</h3>
                                    <Grid container spacing={2}>
                                        {availableTimes.map((time) => (
                                            <Grid item key={time}>
                                                <Chip
                                                    label={time}
                                                    color={
                                                        selectedTimes.includes(
                                                            time
                                                        )
                                                            ? 'primary'
                                                            : 'default'
                                                    }
                                                    onClick={() =>
                                                        toggleTimeSelection(
                                                            time
                                                        )
                                                    }
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </>
                            )}
                        </div>
                        <Box
                            sx={{
                                marginTop: 3,
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={saveAvailability}
                                disabled={
                                    !selectedDate || selectedTimes.length === 0
                                }
                            >
                                Salvar Disponibilidade
                            </Button>
                            <Button
                                sx={{ marginTop: 2 }}
                                variant='outlined'
                                color='primary'
                                onClick={clearAvailability}
                            >
                                Limpar Tudo
                            </Button>
                        </Box>
                    </Box>
                </LocalizationProvider>
                <List
                    className='list'
                    sendDate={handleDate}
                    sendTime={handleTime}
                ></List>
            </section>
        </div>
    );
}
