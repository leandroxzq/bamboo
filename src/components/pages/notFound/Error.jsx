import Header from '../../layout/header/Header.jsx';
import ErrorImg from './404 Error-bro.svg';

function Error() {
    return (
        <>
            <Header />
            <div
                style={{
                    height: 'calc(100dvh - 80px)',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <img
                    src={ErrorImg}
                    alt=''
                    style={{ Height: '400px', minWidth: '400px' }}
                />
            </div>
        </>
    );
}

export default Error;
