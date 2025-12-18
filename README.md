# 💰 Controle de Gastos Residenciais

Aplicação web para **controle de gastos residenciais**, desenvolvida com **.NET (backend)** e **React (frontend)**.

O sistema permite o cadastro de **usuários**, **categorias** e **transações**, além da visualização de detalhes e organização dos gastos.

---

## 🛠️ Tecnologias Utilizadas

### Backend

* .NET
* ASP.NET Core
* Entity Framework Core
* Swagger

### Frontend

* React
* Vite
* Node.js / npm

---

## 🚀 Como Executar o Projeto

### 🔧 Pré-requisitos

* .NET SDK instalado
* Node.js (versão LTS recomendada)
* npm ou yarn
* Banco de dados configurado (ex: SQL Server)

---

## ▶️ Backend (API)

1. Acesse a pasta do backend:

   ```bash
   cd Api
   ```

2. Configure a **string de conexão** no arquivo:

   ```json
   appsettings.Development.json
   ```

   No campo:

   ```json
   "DefaultConnection"
   ```

3. Inicie a aplicação:

   ```bash
   dotnet watch
   ```

4. Ao iniciar, o **Swagger** será aberto automaticamente, permitindo visualizar e testar todos os endpoints da API.

---

## ▶️ Frontend (Web)

1. Acesse a pasta do frontend:

   ```bash
   cd Frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Execute o projeto:

   ```bash
   npm run dev
   ```

4. Acesse no navegador:

   ```
   http://localhost:5173/
   ```

---

## 📄 Funcionalidades

O aplicativo web conta com **5 páginas principais**:

### 📌 Páginas de Cadastro

* Cadastro de **Usuários**
* Cadastro de **Categorias**
* Cadastro de **Transações**

### 📊 Páginas de Detalhes

* Detalhes de **Usuários**
* Detalhes de **Categorias**

Essas páginas permitem acompanhar os gastos, visualizar informações detalhadas e organizar despesas de forma simples.

---

## 📌 Observações

* Certifique-se de que o backend esteja rodando antes de iniciar o frontend.
* As portas padrão são:

  * API: `http://localhost:5035`
  * Frontend: `http://localhost:5173`

---


## 🗄️ Migrações do Banco de Dados

Caso o **backend apresente problemas relacionados ao banco de dados**, como tabelas não criadas ou erros de migração, é possível aplicar as migrações manualmente.

1. Acesse a pasta do backend:

   ```bash
   cd Api
   ```

2. Execute o comando:

   ```bash
   dotnet ef database update
   ```

Esse comando irá:

* Criar o banco de dados (caso ainda não exista)
* Aplicar todas as **migrations pendentes**
* Sincronizar o esquema do banco com o modelo atual da aplicação

> 💡 **Dica:** certifique-se de que a string de conexão em `appsettings.Development.json` esteja corretamente configurada antes de rodar o comando.

---
