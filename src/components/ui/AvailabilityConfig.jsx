import { useState, useEffect } from 'react';

import './AvailabilityConfig.scss';

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
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
    const [selectedDates, setSelectedDates] = useState('');
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [savedDates, setSavedDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [availableTime, setAvailableTimes] = useState([]);

    const fetchSavedDates = async () => {
        try {
            const response = await fetch('http://localhost:5000/availability');
            if (response.ok) {
                const data = await response.json();
                console.log('Data recebida:', data);
                if (data.dates) {
                    const formattedDates = data.dates.map((item) => {
                        return {
                            ...item,
                            date: formatDate(item.date),
                        };
                    });
                    setSavedDates(formattedDates);
                } else {
                    console.error('Nenhuma data encontrada na resposta.');
                }
            } else {
                console.error('Erro ao carregar as datas salvas');
            }
        } catch (error) {
            console.error('Erro ao buscar datas:', error);
        }
    };

    const saveAvailability = async () => {
        if (selectedDates.length === 0 || selectedTimes.length === 0) {
            alert('Por favor, selecione datas e horários.');
            return;
        }

        const formattedDates = selectedDates.map((day) => {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const dayString = String(day).padStart(2, '0');
            return `${year}-${month}-${dayString}`;
        });

        const availability = {
            date: formattedDates,
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
                setSavedDates(data.dates || []);
                alert('Disponibilidade salva com sucesso!');
                fetchSavedDates();
                setSelectedDates([]);
                setSelectedTimes([]);
                setSelectedDate('');
                setAvailableTimes([]);
            } else {
                alert('Erro ao salvar a disponibilidade.');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao se comunicar com o servidor.');
        }
    };

    const clearAvailability = async () => {
        if (
            !window.confirm(
                'Tem certeza de que deseja remover todas as disponibilidades?'
            )
        ) {
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/availability', {
                method: 'DELETE',
            });

            if (response.ok) {
                setSelectedDates([]);
                setSelectedTimes([]);
                setSavedDates([]);
                alert(
                    'Todas as disponibilidades foram removidas do banco de dados.'
                );
            } else {
                alert(
                    'Erro ao tentar remover as disponibilidades do banco de dados.'
                );
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao se comunicar com o servidor.');
        }
    };

    useEffect(() => {
        fetchSavedDates();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const formatDate = (date) => {
        const d = new Date(date);
        return d.toISOString().split('T')[0];
    };

    const formatDateDisplay = (date) => {
        const d = new Date(date);

        const day = String(d.getUTCDate()).padStart(2, '0');
        const month = String(d.getUTCMonth() + 1).padStart(2, '0');
        const year = d.getUTCFullYear();

        return `${day}-${month}-${year}`;
    };

    const generateCalendar = () => {
        const currentDate = new Date();
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const totalDays = lastDay.getDate();
        const firstDayOfWeek = firstDay.getDay();

        let days = [];
        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push(null);
        }
        for (let i = 1; i <= totalDays; i++) {
            days.push(i);
        }
        return days;
    };

    const toggleDateSelection = (day) => {
        setSelectedDates((prevDates) =>
            prevDates.includes(day)
                ? prevDates.filter((date) => date !== day)
                : [...prevDates, day]
        );
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

    const days = generateCalendar();

    return (
        <section className='config'>
            <article className='calendar'>
                <div>
                    <div className='calendar__container'>
                        <h2>Configuração de Disponibilidade</h2>
                        <div className='calendar__date'>
                            {daysOfWeek.map((day, idx) => (
                                <div className='week' key={idx}>
                                    {day}
                                </div>
                            ))}
                            {days.map((day, idx) =>
                                day ? (
                                    <div key={idx}>
                                        <div
                                            className='days'
                                            onClick={() =>
                                                toggleDateSelection(day)
                                            }
                                            style={{
                                                backgroundColor:
                                                    savedDates.some(
                                                        (savedDate) =>
                                                            savedDate.date ===
                                                            `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                                                    )
                                                        ? 'red' // Marca o dia em vermelho se estiver na lista de datas salvas
                                                        : selectedDates.includes(
                                                                day
                                                            )
                                                          ? '#4caf50'
                                                          : '#fff',
                                                color:
                                                    savedDates.some(
                                                        (savedDate) =>
                                                            savedDate.date ===
                                                            `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                                                    ) ||
                                                    selectedDates.includes(day)
                                                        ? '#fff'
                                                        : '#000',
                                            }}
                                        >
                                            {day}
                                        </div>
                                    </div>
                                ) : (
                                    <div key={idx} />
                                )
                            )}
                        </div>
                    </div>
                    <div>
                        <h3>Escolha os Horários Disponíveis</h3>
                        <div className='calendar__time'>
                            {availableTimes.map((time) => (
                                <div
                                    className='item'
                                    key={time}
                                    onClick={() =>
                                        setSelectedTimes((prevTimes) =>
                                            prevTimes.includes(time)
                                                ? prevTimes.filter(
                                                      (t) => t !== time
                                                  )
                                                : [...prevTimes, time]
                                        )
                                    }
                                    style={{
                                        backgroundColor: selectedTimes.includes(
                                            time
                                        )
                                            ? '#4caf50'
                                            : '#fff',
                                        color: selectedTimes.includes(time)
                                            ? '#fff'
                                            : '#000',
                                    }}
                                >
                                    {time}
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className='button-black' onClick={saveAvailability}>
                        Salvar Disponibilidade
                    </button>
                    <button
                        className='button-black'
                        onClick={clearAvailability}
                    >
                        Remover toda configuração
                    </button>
                </div>
            </article>

            <div className='appoint'>
                <div className='appoint__header'>
                    <h2>Exemplo: </h2>
                </div>

                <div className='appoint__input'>
                    <label htmlFor='available-dates'>Datas Disponíveis</label>
                    <select
                        id='available-dates'
                        value={selectedDate}
                        onChange={handleDateChange}
                    >
                        {' '}
                        <option value='' selected>
                            Selecione uma data
                        </option>
                        {savedDates.map((item, index) => (
                            <option key={index} value={item.date}>
                                {formatDateDisplay(item.date)}{' '}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='appoint__input'>
                    <label htmlFor='available-times'>
                        Horários Disponíveis
                    </label>
                    <select id='available-times'>
                        {availableTime.map((time, index) => (
                            <option key={index} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </section>
    );
}

export default AvailabilityConfig;
