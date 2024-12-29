import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useState, useEffect } from 'react';

import './ListAvaibality.scss';

function List() {
    const [savedDates, setSavedDates] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

    const fetchSavedDates = async () => {
        try {
            const response = await fetch('http://localhost:5000/availability');
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

    const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();

        return `${day}-${month}-${year}`;
    };

    const handleDateChange = (event) => {
        const selected = event.target.value;
        setSelectedDate(selected);

        const selectedDateData = savedDates.find(
            (item) => item.date === selected
        );
        if (selectedDateData && selectedDateData.times) {
            setAvailableTimes(selectedDateData.times);
        } else {
            setAvailableTimes([]);
        }
    };

    const update = () => {
        setSelectedDate('');
        setAvailableTimes([]);
        fetchSavedDates();
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
                                    {formatDate(item.date)}
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
                    >
                        {availableTimes.map((time, index) => (
                            <MenuItem key={index} value={time}>
                                {time}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div
                className='button-black'
                onClick={update}
                style={{
                    fontSize: '1rem',
                    minWidth: '170px',
                    marginTop: '1rem',
                }}
            >
                <p>Atualizar</p>
                <i className='bi bi-arrow-clockwise'></i>
            </div>
        </div>
    );
}

export default List;
