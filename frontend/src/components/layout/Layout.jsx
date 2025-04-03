import Header from '../layout/header/Header';
import Footer from '../layout/footer/Footer';

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
