import { Link, useNavigate } from 'react-router';
import { useState, useRef } from 'react';

import Swal from 'sweetalert2';

import './CreatePost.scss';

function CreatePost() {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState('');
    const fileInputRef = useRef(null);

    const navigate = useNavigate();

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setSelectedFileName(file.name);
        } else {
            setImage(null);
            setSelectedFileName('');
        }
    };

    const removeSelected = () => {
        setImage(null);
        setSelectedFileName('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const formDatas = new FormData();
    formDatas.append('imagem', image);
    formDatas.append('title', title);
    formDatas.append('text', text);

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        const API_KEY = import.meta.env.VITE_API_KEY;
        const response = await fetch(
            `https://api.imgbb.com/1/upload?key=${API_KEY}`,
            {
                method: 'POST',
                body: formData,
            }
        );

        const data = await response.json();
        return data.data.url;
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!image) {
            Swal.fire({ title: 'Adicione uma imagem!', icon: 'error' });
            return;
        }

        try {
            const imageUrl = await uploadImage(image);

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/upload`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({ title, text, imageUrl }),
                }
            );

            if (response.ok) {
                Swal.fire({
                    title: 'Postagem realizada com sucesso!',
                    icon: 'success',
                });
                navigate('/blog');
            } else {
                throw new Error('Erro ao criar postagem');
            }
        } catch (error) {
            console.error('Erro ao enviar:', error);
            Swal.fire({ title: 'Erro ao criar postagem!', icon: 'error' });
        }
    };

    return (
        <form action='' className='form' onSubmit={handleUpload}>
            <section className='login'>
                <Link to={'/blog'}>
                    <i className='bi bi-x exit'></i>
                </Link>
                <div className='login__header'>
                    <h2>Criar Postagem</h2>
                </div>
                <div className='login__input'>
                    <label htmlFor='titulo'>Título</label>
                    <input
                        type='text'
                        name='titulo'
                        id='titulo'
                        onChange={handleTitleChange}
                    />
                </div>
                <div className='login__input'>
                    <label htmlFor='texto'>Descrição</label>
                    <textarea
                        name='texto'
                        id='texto'
                        cols='30'
                        rows='10'
                        onChange={handleTextChange}
                    ></textarea>
                </div>
                <label htmlFor='file-upload' className='file-upload'>
                    <i className='bi bi-card-image'></i>
                    <p>Adicionar Imagem</p>
                    <input
                        type='file'
                        name='imagem'
                        id='file-upload'
                        onChange={handleFileChange}
                        ref={fileInputRef}
                    />
                </label>
                {selectedFileName && (
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <i
                            className='bi bi-x-lg'
                            style={{ cursor: 'pointer' }}
                            onClick={removeSelected}
                        ></i>
                        <p className='file-upload__name'>{selectedFileName}</p>
                    </div>
                )}
                <button type='submit' className='button-black'>
                    Criar
                </button>
            </section>
        </form>
    );
}

export default CreatePost;
