import { Link } from 'react-router';

import Header from '../../layout/header/Header.jsx';
import Footer from '../../layout/footer/Footer.jsx';

import './Home.scss';

function Home() {
    return (
        <>
            <Header />
            <main className='main'>
                <Link to={'/posts'}>
                    <section className='background'>
                        <div className='background__image'>
                            <div className='bg-container'>
                                <h2 className='bg-container__title'>
                                    Tecnologia e Saúde Mental: Aplicativos e
                                    Terapia Online Transformam o Cuidado
                                    Emocional
                                </h2>
                                <p className='bg-container__date'>
                                    20 Dezembro, 2024
                                </p>
                            </div>
                        </div>
                    </section>
                </Link>
                <section className='posts'>
                    <span className='posts__latest'>Últimos Posts</span>
                    <article className='posts__container'>
                        <Link to={'/posts'}>
                            <div className='card'>
                                <div className='card__img' />
                                <div className='card__info'>
                                    <p className='card__title'>
                                        Tecnologia e Saúde Mental: Aplicativos e
                                        Terapia Online Transformam o Cuidado
                                        Emocional
                                    </p>
                                    <p className='card__date'>
                                        20 Dezembro, 2024
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </article>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Home;
