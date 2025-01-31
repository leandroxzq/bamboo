import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import './Post.scss';

import { formattedDateUser } from '../../../utils/Date.js';

function Post() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    const fetchPostDetails = async () => {
        try {
            const response = await fetch(`http://localhost:5000/post/${id}`);
            const data = await response.json();
            setPost(data);
            console.log(data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchPostDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (!post) {
        return;
    }

    return (
        <section className='post'>
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
                    <span>{formattedDateUser(post.creation_date)}</span>
                    <p className='text'>{post.text_article}</p>
                </div>
            </article>
        </section>
    );
}

export default Post;
