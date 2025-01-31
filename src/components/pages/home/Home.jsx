import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../auth/AuthContext.jsx';

import { formattedDateUser } from '../../../Date.js';

import { Background } from '../../ui/background/Background.jsx';

import './Home.scss';

export function Home() {
    const [posts, setPosts] = useState([]);

    const { role } = useAuth();

    const navigate = useNavigate();

    const fetchCards = async () => {
        try {
            const response = await fetch('http://localhost:5000/posts');
            const posts = await response.json();
            setPosts(posts);
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
        <main className='main'>
            <Background posts={posts} />
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
                                <div className='card__date'>
                                    <i className='bi bi-calendar-event'></i>
                                    {formattedDateUser(post.creation_date)}
                                </div>
                            </div>
                            {role === 'admin' && (
                                <button
                                    className='button'
                                    onClick={(e) => handleDelete(post.id, e)}
                                >
                                    <i className='bi bi-trash'></i>
                                </button>
                            )}
                        </div>
                    ))}
                </article>
            </section>
        </main>
    );
}
