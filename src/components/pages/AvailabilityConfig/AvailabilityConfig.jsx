import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, Button, Box, Grid, Chip } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';

import Swal from 'sweetalert2';

import Header from '../../layout/header/Header.jsx';
import Footer from '../../layout/footer/Footer.jsx';
import ListAvaibality from '../../ui/ListAvaibality/ListAvaibality.jsx';

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

function AvailabilityConfig() {
    const [selectedDate, setSelectedDate] = useState(null); // Data selecionada no calendário
    const [selectedTimes, setSelectedTimes] = useState([]); // Horários configurados para a data atual
    // eslint-disable-next-line no-unused-vars
    const [savedDates, setSavedDates] = useState({}); // Objeto com datas e horários salvos

    function ClearableProp() {}

    const saveAvailability = async () => {
        const formattedDate = () => dayjs(selectedDate).format('YYYY-MM-DD');
        setSavedDates((prev) => ({
            ...prev,
            [formattedDate]: selectedTimes,
        }));

        const availability = {
            date: formattedDate(selectedDate),
            times: selectedTimes,
        };

        try {
            const response = await fetch('http://localhost:5000/availability', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(availability),
            });

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

    // Função para limpar todas as disponibilidades
    const clearAvailability = async () => {
        if (
            Swal.fire({
                text: 'Tem certeza de que deseja limpar todas as configurações?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Não',
                confirmButtonText: 'Sim',
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Deletado!',
                        text: 'Todas as disponibilidades foram removidas do banco de dados.',
                        icon: 'success',
                    });
                }

                return;
            })
        )
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
                    setSelectedDate(null);
                    setSelectedTimes([]);
                    setSavedDates(null);
                }
            } catch (e) {
                console.error(`Erro na requisição: ${e.message}`);
            }
    };

    // Função para remover um horário
    const toggleTimeSelection = (time) => {
        setSelectedTimes((prevTimes) =>
            prevTimes.includes(time)
                ? prevTimes.filter((t) => t !== time)
                : [...prevTimes, time]
        );
    };

    const formattedDateUser = () => dayjs(selectedDate).format('DD-MM-YYYY');

    return (
        <>
            <Header />
            <div
                className='wrapper'
                style={{ minHeight: 'calc(100vh - 216px)', zIndex: 0 }}
            >
                <section
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: '#ececec93',
                        boxShadow: '1px 1px 50px #00000057',
                        padding: '2rem',
                        borderRadius: '9px',
                        marginTop: '3rem',
                    }}
                >
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale='en-gb'
                    >
                        <Box sx={{ padding: 3 }}>
                            <h2>Configuração de Disponibilidade</h2>
                            <DatePicker
                                sx={{ width: 260 }}
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
                            <Box sx={{ marginTop: 3 }}>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={saveAvailability}
                                    disabled={
                                        !selectedDate ||
                                        selectedTimes.length === 0
                                    }
                                    sx={{ marginRight: 2 }}
                                >
                                    Salvar Disponibilidade
                                </Button>
                                <Button
                                    variant='outlined'
                                    color='primary'
                                    onClick={clearAvailability}
                                >
                                    Limpar Tudo
                                </Button>
                            </Box>
                        </Box>
                    </LocalizationProvider>
                    <ListAvaibality />
                </section>
            </div>
            <Footer />
        </>
    );
}

export default AvailabilityConfig;
