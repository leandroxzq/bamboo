import { Link } from 'react-router';

import '../../../assets/style/Modal.scss';

function CreatePost() {
    return (
        <div className='background-form'>
            <form action='' className='form-login'>
                <section className='login'>
                    <Link to={'/home'}>
                        <i className='bi bi-x exit'></i>
                    </Link>
                    <div className='login__header'>
                        <h2>Criar Postagem</h2>
                    </div>
                    <div className='login__input'>
                        <label htmlFor='titulo'>Título</label>
                        <input type='text' name='titulo' id='titulo' />
                    </div>
                    <div className='login__input'>
                        <label htmlFor='texto'>Descrição</label>
                        <textarea
                            name='texto'
                            id='texto'
                            cols='30'
                            rows='10'
                        ></textarea>
                    </div>
                    <label htmlFor='file-upload' className='file-upload'>
                        <p>Adicionar Imagem</p>
                        <input type='file' name='' id='file-upload' />
                    </label>
                    <button type='submit' className='button-black'>
                        Criar
                    </button>
                </section>
            </form>
        </div>
    );
}

export default CreatePost;
