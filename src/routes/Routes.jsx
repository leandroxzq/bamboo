import { Routes, Route, Navigate } from 'react-router-dom';

import { useAuth } from '../auth/AuthContext.jsx';

import Home from '../components/pages/home/Home.jsx';
import Login from '../components/pages/login/Login.jsx';
import SignUp from '../components/pages/signUp/SignUp.jsx';
import ForgotPassword from '../components/pages/forgotPassword/ForgotPassword.jsx';
import Post from '../components/pages/post/Post.jsx';
import AppointmentsList from '../components/pages/appointmentsList/AppointmentsList.jsx';
import CreateAppointment from '../components/pages/createAppointment/CreateAppointment.jsx';
import CreatePost from '../components/pages/createPost/CreatePost.jsx';
import AvailabilityConfig from '../components/pages/AvailabilityConfig/AvailabilityConfig.jsx';

import Error from '../components/pages/notFound/Error.jsx';

const RoutesConfig = () => {
    const { role } = useAuth();

    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home' replace />} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/cadastre-se' element={<SignUp />} />
            <Route path='/recuperar-senha' element={<ForgotPassword />} />
            <Route path='/posts/:id' element={<Post />} />

            {role !== null && (
                <Route path='/agendamento' element={<CreateAppointment />} />
            )}

            {role === 'admin' && (
                <>
                    <Route path='/criar-postagem' element={<CreatePost />} />
                    <Route
                        path='/configurar-disponibilidade'
                        element={<AvailabilityConfig />}
                    />
                    <Route path='/agendados' element={<AppointmentsList />} />
                </>
            )}

            <Route path='*' element={<Error />} />
        </Routes>
    );
};

export default RoutesConfig;
