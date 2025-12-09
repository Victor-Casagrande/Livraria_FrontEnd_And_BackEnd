# Projeto Final - Livraria Web

Este projeto é a expansão do sistema de gerenciamento de livraria, desenvolvido como avaliação final da disciplina de Desenvolvimento Web I. A aplicação integra um Backend (Node.js/Express) com um Frontend (React), implementando funcionalidades avançadas de autenticação e gerenciamento de dados.

## Funcionalidades Implementadas

Conforme requisitado no projeto, as seguintes funcionalidades foram implementadas:

1.  **Recuperação de Senha via E-mail:** Fluxo completo com envio de token para o Gmail do usuário e redefinição de senha segura.
2.  **Sistema de Favoritos:** O usuário pode marcar/desmarcar livros favoritos, que ficam salvos em sua conta pessoal.
3.  **Upload de Capa de Livro:** Cadastro de livros com upload de imagens (armazenamento local) e exibição no card do livro.
4.  **Autenticação Completa:** Login, Registro e Logout com controle de sessão.

## Vídeo de Demonstração



## Como Executar o Projeto (Instruções para Correção)

### Pré-requisitos

* **Node.js** instalado.
* Uma conta **Gmail** para testar o envio de e-mails de recuperação (é necessário gerar uma "Senha de App" nas configurações de segurança do Google, pois a senha padrão não funciona para aplicações externas).

### Passo 1: Configurar o Backend

1.  Abra o terminal e entre na pasta do backend:
    bash
    cd backend

2.  Instale as dependências:
    bash
    npm install

3.  **Configure as variáveis de ambiente:**
    * Duplique o arquivo `.env.example` e renomeie-o para `.env`.
    * Edite o arquivo `.env` com seus dados:
        ini
        PORT=3333
        SESSION_SECRET=sua-chave-secreta-aqui
        # Credenciais para envio de e-mail (Obrigatório para recuperar senha)
        EMAIL_USER=seu-email@gmail.com
        EMAIL_PASS=sua-senha-de-app-google-de-16-caracteres
        # URL do Frontend para o link no e-mail funcionar corretamente
        FRONTEND_URL=http://localhost:5173

4.  **Inicialize o Banco de Dados:**
    * Execute o script que cria as tabelas (Users, Livros, Favoritos) e colunas necessárias:
        bash
        node scripts/migrate-up.js
        
    * (Opcional) Popule o banco com dados iniciais:
        bash
        npm run seed

5.  Inicie o servidor:
    bash
    npm run dev
    
    O servidor rodará na porta **3333**.

### Passo 2: Configurar o Frontend

1.  Em um **novo terminal**, entre na pasta do frontend:
    bash
    cd frontend
    

2.  Instale as dependências:
    bash
    npm install
    

3.  Inicie o projeto React:
    bash
    npm run dev
    

4.  Acesse o link exibido no terminal.

## Como Testar as Funcionalidades

Recomenda-se testar a aplicação diretamente pela interface web (Frontend), pois as rotas são protegidas por autenticação via Cookies.

1.  **Crie uma conta** na tela de Registro.
2.  **Faça Login**.
3.  **Favoritos:** Clique no ícone de coração nos livros para testar a persistência.
4.  **Upload:** Tente criar um livro enviando uma imagem.
5.  **Recuperação de Senha:**
    * Faça Logout.
    * Clique em "Esqueci minha senha".
    * Insira o e-mail configurado no banco (ou crie um usuário com seu e-mail real).
    * Verifique a caixa de entrada do Gmail e clique no link para redefinir.