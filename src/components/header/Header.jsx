import './Header.scss'
import Logo from '../Logo'

// eslint-disable-next-line react/prop-types
function Header({ onToggle }) {
    return (
        <header className='header'>
            <div className='header__container'>
                <div className='header__logo'>
                    <Logo />
                    <h1 className='header__title'>
                        <span>B</span>
                        <span>a</span>
                        <span>m</span>
                        <span>b</span>
                        <span>o</span>
                        <span>o</span>
                    </h1>
                </div>
                <div className='header__icon'>
                    <i onClick={onToggle} className='bi bi-person-circle'></i>
                    <i className='bi bi-pencil-square'></i>
                    <i className='bi bi-clock'></i>
                </div>
            </div>
        </header>
    )
}

export default Header
