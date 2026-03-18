# 💰 HomeExpenseManager

Sistema de controle de gastos residenciais desenvolvido com foco em boas
práticas de arquitetura, segurança e organização de código.

---

## 📌 Sobre o projeto

O **HomeExpenseManager** é uma API RESTful para gerenciamento financeiro
pessoal/residencial, permitindo o controle de:

- usuários\
- pessoas\
- categorias\
- transações financeiras

O projeto foi desenvolvido com foco em:

- arquitetura em camadas\
- autenticação com JWT\
- validação de dados\
- padronização de respostas\
- tratamento global de exceções\
- documentação com Swagger

---

## 🚀 Tecnologias utilizadas

- .NET 9\
- ASP.NET Core Web API\
- Entity Framework Core\
- SQLite\
- JWT (JSON Web Token)\
- Swagger / OpenAPI\
- FluentValidation\
- AutoMapper

---

## 🧱 Arquitetura

O projeto segue uma arquitetura em camadas para garantir separação de
responsabilidades, escalabilidade e manutenção facilitada.

### 📂 Estrutura

- **API**
  - Controllers\
  - Middlewares\
  - Extensions\
  - Configuração da aplicação
- **Application**
  - DTOs\
  - Services\
  - Interfaces\
  - Validators (FluentValidation)\
  - Dependency Injection\
  - AutoMapper Profiles
- **Domain**
  - Entidades\
  - Enums\
  - Interfaces de repositório
- **Infrastructure**
  - DbContext\
  - Repositórios\
  - Persistência de dados

---

## ⚙️ Funcionalidades

- Cadastro de usuários\
- Autenticação com JWT\
- CRUD de pessoas\
- CRUD de categorias\
- CRUD de transações\
- Filtros de transações por:
  - período\
  - tipo\
  - categoria\
  - pessoa\
- Paginação de resultados\
- Totalizadores por pessoa\
- Totalizadores por categoria\
- Validação com FluentValidation\
- Middleware global de tratamento de erros\
- Documentação com Swagger\
- Proteção de endpoints com Bearer Token

---

## 🧠 Boas práticas aplicadas

- Separação em camadas (Clean Architecture-like)\
- Configuração modular com extension methods\
- JWT configurado via `appsettings.json`\
- Middleware global de exceções\
- Validação centralizada com FluentValidation\
- Respostas padronizadas com Result / PagedResult\
- CORS preparado para integração com front-end

---

## ▶️ Como rodar o projeto

### 📋 Pré-requisitos

- .NET SDK 9.0\
- Git

---

### 1. Clonar o repositório

git clone https://github.com/luciaana567/HomeExpenseManager.git\
cd HomeExpenseManager

---

### 2. Restaurar dependências

dotnet restore

---

### 3. Executar a API

dotnet run --project back-end/src/HomeExpenseManager.API

---

### 🗄️ Banco de dados

A aplicação já está configurada para aplicar as migrations
automaticamente ao iniciar.

Ou seja, o banco será criado/atualizado automaticamente ao rodar a API.

---

### 📖 Swagger

Após iniciar a aplicação, acesse:

http://localhost:xxxx/

A porta pode variar conforme o ambiente.

---

## 🔐 Autenticação

Para acessar endpoints protegidos:

1.  Faça login\
2.  Copie o token JWT retornado\
3.  Clique em **Authorize** no Swagger\
4.  Informe:

Bearer SEU_TOKEN

---

## 🌐 CORS

A API está configurada para permitir integração com front-end local:

- http://localhost:5173\
- http://localhost:3000

---

## 📌 Próximas melhorias

- Testes unitários\
- Testes de integração\
- Pipeline CI/CD\
- Dockerização\
- Versionamento de API\
- Refresh Token

---

## 👩‍💻 Autor

Desenvolvido por **Luciana Silva Araújo Costa**

GitHub: https://github.com/luciaana567
