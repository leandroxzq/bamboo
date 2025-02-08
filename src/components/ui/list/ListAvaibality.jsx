import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useState, useEffect } from 'react';

import { formattedDateUser } from '../../../utils/Date';

import './ListAvaibality.scss';

function List({ sendDate, sendTime }) {
    const [savedDates, setSavedDates] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const fetchSavedDates = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/availability`
            );
            if (response.ok) {
                const data = await response.json();
                setSavedDates(data.dates);
            } else {
                console.error('Nenhuma data encontrada na resposta.');
            }
        } catch (error) {
            console.error('Erro ao buscar datas:', error);
        }
    };

    const handleDateChange = (event) => {
        const selected = event.target.value;
        setSelectedDate(selected);
        setSelectedTime('');
        sendTime(null);
        sendDate(selected);

        const selectedDateData = savedDates.find(
            (item) => item.date === selected
        );

        if (selectedDateData && selectedDateData.times) {
            setAvailableTimes(selectedDateData.times);
        } else {
            setAvailableTimes([]);
        }
    };

    const handleTimeChange = (event) => {
        const selected = event.target.value;
        setSelectedTime(selected);
        sendTime(selected);
    };

    useEffect(() => {
        fetchSavedDates();
    }, []);

    return (
        <div className='list'>
            <div className='list__wrapper'>
                <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>
                        Selecione uma data
                    </InputLabel>
                    <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        label='Selecione uma data'
                        value={selectedDate}
                        onChange={handleDateChange}
                        onClick={fetchSavedDates}
                    >
                        {savedDates?.length ? (
                            savedDates.map((item) => (
                                <MenuItem key={item.date} value={item.date}>
                                    {formattedDateUser(item.date)}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem disabled>
                                Nenhuma data disponível
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
            </div>
            <div className='list__wrapper'>
                <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>
                        Horários
                    </InputLabel>
                    <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        label='Horários'
                        disabled={!availableTimes.length}
                        value={selectedTime}
                        onChange={handleTimeChange}
                    >
                        {availableTimes.length > 0 ? (
                            availableTimes.map((time, index) => (
                                <MenuItem key={index} value={time}>
                                    {time}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem disabled>
                                Sem horários disponíveis
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
            </div>
        </div>
    );
}

export default List;
