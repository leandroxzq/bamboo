import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../../auth/AuthContext.jsx';

import Header from '../../layout/header/Header.jsx';
import Footer from '../../layout/footer/Footer.jsx';

import './Home.scss';

function Home() {
    const [posts, setPosts] = useState([]);

    const { role } = useAuth();

    const navigate = useNavigate();

    const fetchCards = async () => {
        try {
            const response = await fetch('http://localhost:5000/posts');
            const posts = await response.json();
            setPosts(posts.list[0]);
        } catch (e) {
            console.log(e);
        }
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation();

        try {
            const response = await fetch(`http://localhost:5000/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                setPosts(posts.filter((post) => post.id !== id));
            } else {
                console.error('Erro ao excluir o post');
            }
        } catch (error) {
            console.error('Erro ao excluir o post:', error);
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
                    {posts[0] && (
                        <Link to={`/posts/${posts[0].id}`}>
                            <div
                                className='background__image'
                                style={{
                                    backgroundImage: `url(${posts[0].directory_img})`,
                                }}
                            >
                                <div className='bg-container'>
                                    <h2 className='bg-container__title'>
                                        {posts[0].title}
                                    </h2>
                                    <p className='bg-container__date'>
                                        {posts[0].creation_date}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    )}
                </section>

                <section className='posts'>
                    {posts.length === 0 ? (
                        <p className='posts__latest'>
                            Nenhuma publicacão disponivel
                        </p>
                    ) : (
                        <span className='posts__latest'>Últimos Posts</span>
                    )}
                    <article className='posts__container'>
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className='card'
                                onClick={() => navigate(`/posts/${post.id}`)}
                            >
                                <div
                                    className='card__img'
                                    style={{
                                        backgroundImage: `url(${
                                            post.directory_img
                                        })`,
                                    }}
                                />
                                <div className='card__info'>
                                    <p className='card__title'>{post.title}</p>
                                    <p className='card__date'>
                                        {post.creation_date}
                                    </p>
                                </div>
                                {role === 'admin' && (
                                    <button
                                        className='button'
                                        onClick={(e) =>
                                            handleDelete(post.id, e)
                                        }
                                    >
                                        <i className='bi bi-trash'></i>
                                    </button>
                                )}
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
