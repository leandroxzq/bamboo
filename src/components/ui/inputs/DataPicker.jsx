import { useState, useEffect } from 'react';

import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export function DataPicker({ label, value, onChange }) {
    const [cleared, setCleared] = useState(false);

    useEffect(() => {
        if (cleared) {
            const timeout = setTimeout(() => {
                setCleared(false);
            }, 1500);

            return () => clearTimeout(timeout);
        }
        return () => {};
    }, [cleared]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
            <DesktopDatePicker
                label={label}
                sx={{
                    width: '100%',
                }}
                value={value}
                onChange={onChange}
                slotProps={{
                    field: {
                        clearable: true,
                        onClear: () => setCleared(true),
                    },
                }}
            />
        </LocalizationProvider>
    );
}
