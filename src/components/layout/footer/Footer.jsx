import Logo from '../../ui/Logo.jsx';
import './Footer.scss';

function Footer() {
    return (
        <footer className='footer'>
            <div className='footer__wrapper'>
                <Logo />
                <div>
                    <p>Bamboo</p>
                    <p>© Bamboo 2024. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
