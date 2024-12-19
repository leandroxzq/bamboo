import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../components/home/Home.jsx';
import Login from '../components/login/Login.jsx';
import Cadastro from '../components/cadastro/Cadastro.jsx';
import Esqueceu from '../components/esqueceu/Esqueceu.jsx';
import Post from '../components/post/Post.jsx';
import Agendados from '../components/agendados/agendados.jsx';
import Agendamento from '../components/agendamento/Agendamento.jsx';
import Criar from '../components/criarPostagem/criarPostagem.jsx';

const RoutesConfig = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home' replace />} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/cadastre-se' element={<Cadastro />} />
            <Route path='/esqueceu' element={<Esqueceu />} />
            <Route path='/posts' element={<Post />} />
            <Route path='/agendados' element={<Agendados />} />
            <Route path='/agendamento' element={<Agendamento />} />
            <Route path='/criar' element={<Criar />} />
        </Routes>
    );
};

export default RoutesConfig;
