import Header from '../../layout/header/Header.jsx';
import Footer from '../../layout/footer/Footer.jsx';

import Calendario from '../../ui/AvailabilityConfig/AvailabilityConfig.jsx';
import List from '../../ui/ListAvaibality/ListAvaibality.jsx';

import './AppointmentsList.scss';

function agendados() {
    return (
        <>
            <Header />
            <section className='config-wrapper'>
                <Calendario />
                <List />
            </section>
            <div className='agendados'>
                <h1
                    style={{
                        textAlign: 'center',
                        width: '100%',
                        margin: '4rem 0 0 0',
                    }}
                >
                    Consultas Marcadas
                </h1>
                <div className='agendados-container'>
                    <div className='agendados-container__card'>
                        <h2>Leandro </h2>
                        <p>ADS 2 Periodo</p>
                        <p>20 Dezembro, 2024 - 14h</p>
                    </div>
                    <div className='agendados-container__card'>
                        <h2>Leandro</h2>
                        <p>ADS 2 Periodo</p>
                        <p>20 Dezembro, 2024 - 14h</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default agendados;
