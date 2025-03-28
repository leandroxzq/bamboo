import Logo from '../../ui/Logo.jsx';
import './Footer.scss';

function Footer() {
    return (
        <footer className='footer'>
            <div className='footer__wrapper'>
                <div className='footer__logo'>
                    <Logo />
                </div>
                <p className='footer__msg'>
                    Sua saúde mental é tão importante quanto a física. Reserve
                    um tempo para você, cuide-se e não hesite em buscar apoio
                    quando precisar.
                </p>
                <a
                    href='https://mail.google.com/mail/?view=cm&fs=1&to=bamboo@gmail.com'
                    className='footer__email'
                    target='_blank'
                >
                    <div className='footer__contact-card'>
                        <p>Entre em Contato</p>
                        <p>bamboo@gmail.com</p>
                    </div>
                </a>
            </div>
            <div className='footer__copyright'>
                <p>© 2025 Bamboo. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer;
