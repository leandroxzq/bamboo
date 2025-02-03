import { Routes, Route, Navigate } from 'react-router-dom';

import { useAuth } from '../auth/AuthContext.jsx';

import Layout from '../components/layout/Layout.jsx';

import Login from '../components/pages/login/Login.jsx';
import SignUp from '../components/pages/signUp/SignUp.jsx';
import ForgotPassword from '../components/pages/forgotPassword/ForgotPassword.jsx';

import { Home } from '../components/pages/home/Home.jsx';
import { Profile } from '../components/pages/profile/Profile.jsx';
import Post from '../components/pages/post/Post.jsx';
import CreatePost from '../components/pages/createPost/CreatePost.jsx';

import CreateAppointment from '../components/pages/createAppointment/CreateAppointment.jsx';
import AvailabilityConfig from '../components/pages/availabilityConfig/AvailabilityConfig.jsx';
import AppointmentsList from '../components/pages/appointmentsList/AppointmentsList.jsx';

import Error from '../components/pages/notFound/Error.jsx';

const RoutesConfig = () => {
    const { role } = useAuth();

    return (
        <Routes>
            {/* Rotas públicas */}
            <Route path='/' element={<Navigate to='/blog' replace />} />
            <Route
                path='/blog'
                element={
                    <Layout>
                        <Home />
                    </Layout>
                }
            />
            <Route
                path='/posts/:id'
                element={
                    <Layout>
                        <Post />
                    </Layout>
                }
            />

            {/* Rotas sem Header/Footer */}
            <Route path='/login' element={<Login />} />
            <Route path='/cadastre-se' element={<SignUp />} />
            <Route path='/recuperar-senha' element={<ForgotPassword />} />

            {/* Rotas protegidas */}
            {role !== null && (
                <Route path='/agendamento' element={<CreateAppointment />} />
            )}

            {role === 'user' && (
                <Route
                    path='/perfil'
                    element={
                        <Layout>
                            <Profile />
                        </Layout>
                    }
                />
            )}

            {/* Rotas de administrador */}
            {role === 'admin' && (
                <>
                    <Route path='/criar-postagem' element={<CreatePost />} />
                    <Route
                        path='/configurar-disponibilidade'
                        element={
                            <Layout>
                                <AvailabilityConfig />
                            </Layout>
                        }
                    />
                    <Route
                        path='/agendados'
                        element={
                            <Layout>
                                <AppointmentsList />
                            </Layout>
                        }
                    />
                </>
            )}

            {/* Rota de erro */}
            <Route path='*' element={<Error />} />
        </Routes>
    );
};

export default RoutesConfig;
