import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../components/pages/home/Home.jsx';
import Login from '../components/pages/login/Login.jsx';
import SignUp from '../components/pages/signUp/SignUp.jsx';
import ForgotPassword from '../components/pages/forgotPassword/ForgotPassword.jsx';
import Post from '../components/pages/post/Post.jsx';
import AppointmentsList from '../components/pages/appointmentsList/AppointmentsList.jsx';
import CreateAppointment from '../components/pages/createAppointment/CreateAppointment.jsx';
import CreatePost from '../components/pages/createPost/CreatePost.jsx';

const RoutesConfig = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home' replace />} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/cadastre-se' element={<SignUp />} />
            <Route path='/recuperar-senha' element={<ForgotPassword />} />
            <Route path='/posts' element={<Post />} />
            <Route path='/agendados' element={<AppointmentsList />} />
            <Route path='/agendamento' element={<CreateAppointment />} />
            <Route path='/criar-postagem' element={<CreatePost />} />
        </Routes>
    );
};

export default RoutesConfig;
