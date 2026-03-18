# HomeExpenseManager

Sistema de controle de gastos residenciais.

# back-end

API para gerenciamento de gastos residenciais, permitindo o controle de usuários, pessoas, categorias e transações financeiras.

O projeto foi desenvolvido com foco em boas práticas de organização em camadas, autenticação com JWT, validação de dados, documentação com Swagger e tratamento global de exceções.

---

## Tecnologias utilizadas

- .NET 9
- ASP.NET Core Web API
- Entity Framework Core
- SQLite
- JWT Authentication
- Swagger / OpenAPI
- FluentValidation
- AutoMapper

---

## Arquitetura do projeto

O projeto está organizado em camadas para separar responsabilidades e facilitar manutenção, evolução e testes.

### Estrutura

- **HomeExpenseManager.API**
  - Controllers
  - Middlewares
  - Extensions
  - Configuração da aplicação

- **HomeExpenseManager.Application**
  - DTOs
  - Services
  - Interfaces
  - Validators
  - Dependency Injection
  - Profiles do AutoMapper

- **HomeExpenseManager.Domain**
  - Entidades
  - Enums
  - Interfaces de repositório

- **HomeExpenseManager.Infrastructure**
  - DbContext
  - Repositórios
  - Persistência de dados

---

## Funcionalidades atuais

- Cadastro de usuários
- Autenticação com JWT
- Cadastro e consulta de pessoas
- Cadastro e consulta de categorias
- Cadastro, edição, exclusão e busca de transações
- Filtros de transações por:
  - período
  - tipo
  - categoria
  - pessoa
- Paginação de transações
- Totais por pessoa
- Totais por categoria
- Validação com FluentValidation
- Middleware global para tratamento de exceções
- Documentação da API com Swagger
- Proteção de endpoints com Bearer Token

---

## Padrões e melhorias aplicadas

- Separação em camadas
- Configuração modular com extension methods
- JWT configurado via `appsettings.json`
- Swagger com suporte a autenticação Bearer
- Middleware global para erros não tratados
- Validação centralizada com FluentValidation
- CORS preparado para integração com front-end

---

## Como rodar o projeto

### Pré-requisitos

Antes de começar, você precisa ter instalado:

- [.NET SDK 9.0](https://dotnet.microsoft.com/download)
- Git

---

## 1. Clonar o repositório

## 2. Restaurar os pacotes

-dotnet restore

## 3. Rodar o projeto

-dotnet run --project back-end/src/HomeExpenseManager.API

## 4. Swagguer

Quando a aplicação subir, o Swagger ficará disponível na raiz da aplicação.
A porta pode variar conforme o ambiente.

---

Autor

Desenvolvido por Luciana Silva Araújo Costa.
