import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { LoaderCircle } from 'lucide-react';
import Skeleton from '@mui/material/Skeleton';

import './Post.scss';

import { formattedPostUser } from '../../../utils/Date.js';

function Post() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchPostDetails = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/post/${id}`
            );
            const data = await response.json();
            setPost(data);
            console.log(data);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPostDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <section className='post'>
            {loading ? (
                <article className='post__content'>
                    <div className='post__loading'>
                        <Skeleton
                            className='post__header__img'
                            variant='rectangular'
                            animation='wave'
                            width='100%'
                            sx={{
                                borderRadius: '8px',
                                minHeight: '500px',
                            }}
                        />
                        <LoaderCircle
                            style={{
                                height: '50px',
                                strokeWidth: 2,
                                width: '100%',
                                textAlign: 'center',
                                marginTop: '20px',
                            }}
                            className='loading'
                        />
                        <Skeleton
                            className='title'
                            variant='text'
                            animation='wave'
                            width='100%'
                            sx={{
                                borderRadius: '8px',
                                minHeight: '50px',
                            }}
                        />
                        <Skeleton
                            variant='text'
                            animation='wave'
                            width='20%'
                            sx={{
                                borderRadius: '8px',
                                minHeight: '30px',
                            }}
                        />
                        <Skeleton
                            className='text'
                            variant='text'
                            animation='wave'
                            width='100%'
                            sx={{
                                borderRadius: '8px',
                                minHeight: '200px',
                            }}
                        />
                    </div>
                </article>
            ) : (
                <article className='post__content'>
                    <div className='post__header'>
                        <div
                            className='post__header__img'
                            style={{
                                backgroundImage: `url(${post.directory_img})`,
                            }}
                        />
                    </div>
                    <div className='post__body'>
                        <h1 className='title'>{post.title}</h1>
                        <span>{formattedPostUser(post.creation_date)}</span>
                        <p className='text'>{post.text_article}</p>
                    </div>
                </article>
            )}
        </section>
    );
}

export default Post;
