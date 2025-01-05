import { useState, useEffect } from 'react';
import DarkModeToggle from 'react-dark-mode-toggle';

function DarkMode() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('darkMode');
        return savedTheme === 'true';
    });

    useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkMode);
        localStorage.setItem('darkMode', isDarkMode);
    }, [isDarkMode]);

    return (
        <DarkModeToggle
            onChange={setIsDarkMode}
            checked={isDarkMode}
            size={80}
        />
    );
}

export default DarkMode;
