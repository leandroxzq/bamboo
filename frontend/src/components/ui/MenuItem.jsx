import { Link } from 'react-router';

export function MenuItem({ to, icon, label, onClick }) {
    return (
        <Link to={to} onClick={onClick}>
            <i className={`bi ${icon}`}></i>
            {label}
        </Link>
    );
}
