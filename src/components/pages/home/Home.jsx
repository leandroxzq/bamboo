import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';

import Header from '../../layout/header/Header.jsx';
import Footer from '../../layout/footer/Footer.jsx';

import './Home.scss';

function Home() {
    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();

    const postsNavegate = () => {
        navigate('/posts');
    };

    const fetchCards = async () => {
        try {
            const response = await fetch('http://localhost:5000/posts');
            const posts = await response.json();
            setPosts(posts.list[0]);
            console.log(posts.list[0]);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchCards();
    }, []);

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
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className='card'
                                onClick={() => postsNavegate()}
                            >
                                <div
                                    className='card__img'
                                    style={{
                                        backgroundImage: `url(${
                                            post.diretorio_imagem
                                        })`,
                                    }}
                                />
                                <div className='card__info'>
                                    <p className='card__title'>{post.titulo}</p>
                                    <p className='card__date'>
                                        {post.data_criacao}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </article>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Home;
