# 💸 HomeExpenseManager

Sistema para controle de gastos residenciais, desenvolvido como teste
técnico para vaga de Desenvolvedor Full Stack.

---

## 📌 Sobre o projeto

Aplicação full stack para gerenciamento de:

- Pessoas\
- Categorias\
- Transações financeiras

Permite o cálculo de receitas, despesas e saldo por pessoa e por
categoria.

---

## 🧱 Arquitetura

O projeto está dividido em duas aplicações independentes:

- **Back-end:** API REST em .NET\
- **Front-end:** Aplicação web em React com TypeScript

---

## ⚙️ Tecnologias

### 🔙 Back-end

- .NET 9\
- ASP.NET Core Web API\
- Entity Framework Core\
- SQLite\
- JWT Authentication\
- AutoMapper\
- FluentValidation\
- Swagger

### 🔜 Front-end

- React\
- TypeScript\
- Vite\
- React Router\
- Axios\
- TailwindCSS\
- Recharts

---

## 📂 Estrutura

### Back-end

    HomeExpenseManager.API
    HomeExpenseManager.Application
    HomeExpenseManager.Domain
    HomeExpenseManager.Infrastructure

### Front-end

    src/
      components/
      pages/
      services/
      hooks/
      contexts/
      routes/
      types/

---

## 🚀 Funcionalidades

### 👤 Pessoas

- Criar, editar, listar e excluir\
- Campos: nome e idade\
- Exclusão remove transações associadas

---

### 🏷️ Categorias

- Criar e listar\
- Finalidade:
  - Receita\
  - Despesa\
  - Ambas

---

### 💰 Transações

- Criar, listar, editar e excluir\
- Campos:
  - Descrição\
  - Valor\
  - Tipo\
  - Data\
  - Categoria\
  - Pessoa

---

## 📏 Regras de negócio

- Menores de 18 anos só podem cadastrar despesas\
- Categorias são validadas conforme o tipo:
  - Receita → categorias de receita ou ambas\
  - Despesa → categorias de despesa ou ambas\
- Valor deve ser maior que zero\
- Exclusão de pessoa remove suas transações

---

## 📊 Consultas

### Totais por pessoa

- Total de receitas\
- Total de despesas\
- Saldo\
- Total geral

### Totais por categoria (opcional)

- Totais por categoria\
- Saldo\
- Total geral

---

## 🔐 Autenticação

- JWT\
- Rotas protegidas

---

## ▶️ Como executar

### 🔙 Back-end

```bash
cd back-end/src/HomeExpenseManager.API
restaure os paoctes do projeto
dotnet run
```

Swagger:

    https://localhost:7249/index.html

---

### 🔜 Front-end

```bash
cd front-end
npm install
npm run dev
```

    http://localhost:5173

---

👩‍💻 Desenvolvido por

Luciana Costa
