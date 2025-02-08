# Bamboo

Este repositório contém o frontend de uma aplicação desenvolvida com React.js e Material UI para componentes como skeletons, inputs e datepickers. A aplicação é voltada para a gestão de postagens, visualização de blogs e agendamentos com uma psicóloga. Além disso, oferece funcionalidades específicas para diferentes perfis de usuários:

## O projeto pode ser testado por completo na vercel

https://bamboo-rho.vercel.app

Use estas credenciais para realizar login e testar as funcionalidades da aplicação.

```bash
- Conta Admin

Usuário: psicologa
Senha: 123

- Conta Aluno

Usuário: aluno@discente.ifpe.edu.br
Senha: 123
```

## Funcionalidades da Aplicação

Para Psicóloga:

- Gestão de Agendamentos: Configurar datas e horários disponíveis para agendamentos.

- Painel de Controle: Visualizar dados dos agendamentos, alterar o status dos agendamentos (confirmado, cancelado, pendente, etc.).

- Gestão de Postagens: Criar, editar e excluir postagens no blog.

Para Usuários:

- Agendamento de Consultas: Escolher horários disponíveis para agendar consultas com a psicóloga.

- Visualização de Perfil: Acessar informações pessoais e consultas agendadas.

- Cancelamento de Consultas: Cancelar consultas pendentes diretamente no perfil do usuário.

## Links do Projeto

[Deploy Vercel](https://bamboo-rho.vercel.app)

[Repositório do frontend](https://github.com/leandroxzq/bamboo)

[Repositório do backend](https://github.com/leandroxzq/backend-bamboo)

## Pré-requisitos

Antes de rodar o frontend localmente, você precisa ter o Node.js instalado em sua máquina. Caso ainda não tenha o Node.js instalado, siga as instruções no [site oficial do Node.js](https://nodejs.org/).

Além disso, será necessário o npm (gerenciador de pacotes do Node.js), que já vem instalado junto com o Node.js.

## Instalação e Execução

## O projeto pode ser testado pela vercel

### 1. Clone o repositório

```bash
git clone https://github.com/leandroxzq/bamboo.git
cd bamboo
```

### 2. Instale as dependências

Dentro do diretório do projeto, execute o comando abaixo para instalar as dependências necessárias:

```bash
npm install
```

### 3. Execute o servidor de desenvolvimento

Para rodar o frontend em modo de desenvolvimento, execute o seguinte comando:

```bash
npm run dev
```

O Vite irá iniciar o servidor local e disponibilizar a aplicação na URL http://localhost:5173.

### 4. Configuração de Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto e defina a URL da API que será consumida pela aplicação. Para rodar o frontend localmente com a API do backend também local, configure da seguinte forma:

```bash
VITE_API_URL=http://localhost:5000
```

Se estiver utilizando o ambiente de produção, a URL pode ser diferente, como o link de sua API hospedada. Não se esqueça de configurar o arquivo .env corretamente!
