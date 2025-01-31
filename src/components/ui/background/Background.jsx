import { Link } from 'react-router';
import Skeleton from '@mui/material/Skeleton';

import './Background.scss';

import { formattedDateUser } from '../../../Date.js';

export function Background({ posts }) {
    return (
        <section className='background'>
            {posts[0] ? (
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
                            <div className='bg-container__date'>
                                <i className='bi bi-calendar-event'></i>
                                {formattedDateUser(posts[0].creation_date)}
                            </div>
                        </div>
                    </div>
                </Link>
            ) : (
                <div className='background'>
                    <Skeleton
                        animation='pulse'
                        variant='rectangular'
                        width='100%'
                        height='100%'
                        style={{
                            borderRadius: '1rem',
                        }}
                        sx={{ bgcolor: 'grey.300' }}
                    />
                </div>
            )}
        </section>
    );
}
