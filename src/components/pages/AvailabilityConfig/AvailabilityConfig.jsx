import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, Button, Box, Grid, Chip } from '@mui/material';
import dayjs from 'dayjs';

import Header from '../../layout/header/Header.jsx';
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
    const [savedDates, setSavedDates] = useState({}); // Objeto com datas e horários salvos

    console.log(savedDates);
    // Função para salvar a disponibilidade
    const saveAvailability = async () => {
        const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
        setSavedDates((prev) => ({
            ...prev,
            [formattedDate]: selectedTimes,
        }));

        const availability = {
            date: formattedDate,
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
                alert(
                    `Disponibilidade salva com sucesso ${formattedDate}, ${selectedTimes}`
                );
                setSavedDates(data);
                setSelectedDate(null);
                setSelectedTimes([]);
            }
        } catch (e) {
            console.error(`Erro na requisição: ${e.message}`);
        }
    };

    // Função para limpar todas as disponibilidades
    const clearAvailability = async () => {
        if (
            !window.confirm(
                'Tem certeza de que deseja limpar todas as configurações?'
            )
        ) {
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/availability', {
                method: 'DELETE',
            });

            if (response.ok) {
                setSelectedDate(null);
                setSelectedTimes([]);
                setSavedDates(null);
            }

            alert(
                'Todas as disponibilidades foram removidas do banco de dados.'
            );
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

    return (
        <>
            <Header />
            <section
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '60vh',
                }}
            >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box sx={{ padding: 3 }}>
                        <h2>Configuração de Disponibilidade</h2>
                        <DatePicker
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
                                    !selectedDate || selectedTimes.length === 0
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
        </>
    );
}

export default AvailabilityConfig;
