import './Modal.scss';

import { BrowserRouter, Routes, Route } from 'react-router';
import Login from '../login/Login.jsx';
import Esqueceu from '../esqueceu/Esqueceu.jsx';
import Cadastro from '../cadastro/Cadastro.jsx';

// eslint-disable-next-line react/prop-types
function Modal({ onToggle }) {
    return (
        <div className='background-form'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login onClose={onToggle} />} />
                    <Route
                        path='/esqueceu'
                        element={<Esqueceu onClose={onToggle} />}
                    />
                    <Route
                        path='/cadastre-se'
                        element={<Cadastro onClose={onToggle} />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default Modal;
