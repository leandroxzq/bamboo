import { useState } from 'react';

import {
    IconButton,
    OutlinedInput,
    InputLabel,
    InputAdornment,
    FormControl,
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export function Password({
    label = 'Password',
    value,
    onChange,
    placeholder = 'Enter your password',
}) {
    const [showPassword, setShowPassword] = useState(true);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    return (
        <FormControl variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-password'>
                {label}
            </InputLabel>
            <OutlinedInput
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                id='outlined-adornment-password'
                type={showPassword ? 'password' : 'text'}
                endAdornment={
                    <InputAdornment position='end'>
                        <IconButton
                            aria-label={
                                showPassword
                                    ? 'hide the password'
                                    : 'display the password'
                            }
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge='end'
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
            />
        </FormControl>
    );
}
