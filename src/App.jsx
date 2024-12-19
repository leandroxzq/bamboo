import { BrowserRouter } from 'react-router';
import RoutesConfig from './routes/Routes.jsx';

import '../node_modules/bootstrap-icons/font/bootstrap-icons.scss';
import './App.scss';

function App() {
    return (
        <BrowserRouter>
            <div className='App'>
                <RoutesConfig />
            </div>
        </BrowserRouter>
    );
}

export default App;
