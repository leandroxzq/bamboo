import { BrowserRouter } from 'react-router';
import RoutesConfig from './routes/Routes.jsx';
import { AuthProvider } from './auth/AuthContext.jsx';

import '../node_modules/bootstrap-icons/font/bootstrap-icons.scss';
import './assets/style/App.scss';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className='App'>
                    <RoutesConfig />
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
