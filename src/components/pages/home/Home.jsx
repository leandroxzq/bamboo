import { Link, useNavigate } from 'react-router';

import Header from '../../layout/header/Header.jsx';
import Footer from '../../layout/footer/Footer.jsx';

import './Home.scss';

function Home() {
    const navigate = useNavigate();

    const postsNavegate = () => {
        navigate('/posts');
    };

    return (
        <>
            <Header />
            <main className='main'>
                <section className='background'>
                    <Link to={'/posts'}>
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
                    </Link>
                </section>

                <section className='posts'>
                    <span className='posts__latest'>Últimos Posts</span>
                    <article className='posts__container'>
                        <div className='card' onClick={postsNavegate}>
                            <div className='card__img' />
                            <div className='card__info'>
                                <p className='card__title'>
                                    Tecnologia e Saúde Mental: Aplicativos e
                                    Terapia Online Transformam o Cuidado
                                    Emocional
                                </p>
                                <p className='card__date'>20 Dezembro, 2024</p>
                            </div>
                        </div>
                    </article>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Home;
