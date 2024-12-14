import '../node_modules/bootstrap-icons/font/bootstrap-icons.scss';
import './App.scss';

import Header from './components/header/Header.jsx';
import Home from './components/home/Home.jsx';
import Footer from './components/footer/Footer.jsx';
import Modal from './components/modal/Modal.jsx';

import { useState } from 'react';

function App() {
    const [showModal, setShowModal] = useState(false);

    const handleToggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div className='App'>
            <Header onToggle={handleToggleModal} />
            <Home />
            {showModal && <Modal onToggle={handleToggleModal} />}
            <Footer />
        </div>
    );
}

export default App;
