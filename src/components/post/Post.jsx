import Header from '../header/Header.jsx';
import Footer from '../footer/Footer.jsx';

import './Post.scss';

function post() {
    return (
        <>
            <Header />
            <section className='post'>
                <article className='post__content'>
                    <div className='post__header'>
                        <h1 className='post__header__title'>
                            Pesquisa Revela Aumento da Busca por Terapia e Apoia
                            à Saúde Mental em Jovens Brasileiros
                        </h1>
                        <div className='post__header__img'></div>
                    </div>
                    <p className='post__text'>
                        Estudo aponta que 65% dos jovens entre 18 e 30 anos
                        priorizam cuidados com a saúde mental após a pandemia.
                        Um estudo recente realizado pela Universidade de São
                        Paulo (USP) revelou que os jovens brasileiros estão cada
                        vez mais atentos à importância da saúde mental. Segundo
                        a pesquisa, 65% dos entrevistados entre 18 e 30 anos
                        afirmaram que buscaram ajuda profissional ou iniciaram
                        práticas de autocuidado para lidar com questões como
                        ansiedade, estresse e depressão. A pandemia de COVID-19
                        foi um divisor de águas para muitos. O isolamento
                        social, as incertezas econômicas e as perdas emocionais
                        intensificaram o debate sobre o bem-estar psicológico. A
                        pesquisa destacou que a busca por terapia online cresceu
                        120% nos últimos dois anos, enquanto práticas como
                        meditação e yoga ganharam mais adeptos. “Os jovens estão
                        mais conscientes de que cuidar da mente é tão importante
                        quanto cuidar do corpo. Ainda há estigmas, mas a
                        abertura para falar sobre saúde mental tem crescido
                        significativamente,” explicou a psicóloga e pesquisadora
                        Dra. Carla Mendes, líder do estudo. Entidades e
                        profissionais de saúde comemoram a mudança de
                        perspectiva, mas alertam para a necessidade de mais
                        políticas públicas que facilitem o acesso ao atendimento
                        psicológico, principalmente em regiões vulneráveis. O
                        estudo também destacou o papel das redes sociais como
                        influenciadoras positivas e negativas. Enquanto alguns
                        conteúdos ajudam na conscientização, outros podem
                        intensificar quadros de comparação e baixa autoestima.
                        Especialistas recomendam que jovens busquem informações
                        confiáveis e invistam em redes de apoio, destacando que
                        cuidar da saúde mental não é sinal de fraqueza, mas um
                        ato de coragem e autoconhecimento. Se você ou alguém que
                        conhece precisa de apoio, procure um profissional ou
                        entre em contato com serviços como o CVV pelo número
                        188.
                    </p>
                </article>
            </section>
            <Footer />
        </>
    );
}

export default post;
