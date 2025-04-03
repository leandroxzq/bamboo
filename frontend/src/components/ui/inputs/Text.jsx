import TextField from '@mui/material/TextField';

export function Text({ id, label, value, onChange, placeholder }) {
    return (
        <TextField
            id={id}
            label={label}
            variant='outlined'
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
}
