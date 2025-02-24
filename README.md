# 🎋 Bamboo

Este repositório contém o frontend de uma aplicação desenvolvida com React.js e Material UI para componentes como skeletons, inputs e datepickers. A aplicação é voltada para a gestão de postagens é horarios, visualização de conteúdo e agendamentos com uma psicóloga. Oferece funcionalidades específicas para diferentes perfis de usuários:

## Links do Projeto

[Deploy Vercel](https://bamboo-rho.vercel.app)

[Repositório do frontend](https://github.com/leandroxzq/bamboo)

[Repositório do backend](https://github.com/leandroxzq/backend-bamboo)

## 🎯 Motivação do Projeto

O Projeto Bamboo foi desenvolvido como parte da disciplina de Engenharia de Software, sob requisito do professor, seguindo diretrizes dos Objetivos de Desenvolvimento Sustentável (ODS) da ONU e com foco na comunidade do campus IFPE.

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

- Visualização de Postagens

- Agendamento de Consultas: Escolher horários disponíveis para agendar consultas com a psicóloga.

- Visualização de Perfil: Acessar informações pessoais e consultas agendadas.

- Cancelamento de Consultas: Cancelar consultas pendentes diretamente no perfil do usuário.

## Instalação

### 1. Clone os repositórios

```bash
git clone https://github.com/leandroxzq/bamboo.git
cd bamboo
```

### 2. Instale as dependências

Dentro dos diretórios do projeto, execute o comando abaixo para instalar as dependências necessárias:

```bash
npm install
```

### 3. Execute o projeto

Utilize o script em ambos.

```bash
npm run dev
```

## Configuração do Ambiente

### - Frontend:

Na raiz do seu projeto, crie um arquivo chamado .env, defina as variáveis de ambiente conforme o exemplo abaixo:

```bash
VITE_API_URL=http://localhost:5000
VITE_API_KEY="SUA KEY NO IMGBB"
```

- VITE_API_URL: Esta variável define a URL da API que o frontend irá consumir. No exemplo, a API está rodando localmente na porta 5000.

- VITE_API_KEY: Esta variável armazena a chave da API do IMGBB.

### - Backend:

```bash
SECRET_KEY="SUAKEYSEGURA"
BD_HOST="ENDEREÇO_BANCO"
BD_NAME="NOME_BANCO"
BD_USER="SEU_USER"
BD_PASSWORD="SUA_SENHA"
```

- SECRET_KEY: Chave secreta usada para assinar tokens JWT ou outras operações de criptografia.

- BD_HOST: Endereço do servidor do banco de dados.

- BD_NAME: Nome do banco de dados.

- BD_USER: Usuário do banco de dados.

- BD_PASSWORD: Senha do banco de dados.

# 🗃️ Configuração do Banco de Dados

O arquivo `schema.sql` contém todos os comandos necessários para criar as tabelas no banco de dados. Ele está localizado na pasta `database/` no backend.

Certifique-se de que as variáveis de ambiente no arquivo `.env` do backend estejam corretamente configuradas para se conectar ao banco de dados.
