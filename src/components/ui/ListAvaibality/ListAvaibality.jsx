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
                console.log('Data recebida:', data.dates);
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

    useEffect(() => {
        fetchSavedDates();
    }, []);

    return (
        <div className='list'>
            <div className='list__wrapper'>
                <label htmlFor='dates'>Datas Disponíveis</label>
                <select
                    id='dates'
                    value={selectedDate}
                    onChange={handleDateChange}
                    onClick={fetchSavedDates}
                    disabled={!savedDates}
                >
                    <option value='' disabled selected>
                        Selecione uma data
                    </option>
                    {savedDates.map((item) => (
                        <option key={item.date} value={item.date}>
                            {formatDate(item.date)}{' '}
                        </option>
                    ))}
                </select>
            </div>

            <div className='list__wrapper'>
                <label htmlFor='times'>Horários Disponíveis</label>
                <select id='times' disabled={!availableTimes.length}>
                    <option value='' disabled>
                        Selecione um horário
                    </option>
                    {availableTimes.map((time, index) => (
                        <option key={index} value={time}>
                            {time}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default List;
