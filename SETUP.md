# 4P Finance

Aplicação de gerenciamento financeiro desenvolvida com React, TypeScript, TanStack Router e TanStack Query.

## 🚀 Tecnologias

- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **Tailwind CSS** - Estilização
- **Radix UI** - Componentes acessíveis
- **Radix Icons** - Ícones
- **TanStack Router** - Gerenciamento de rotas
- **TanStack Query** - Gerenciamento de estado assíncrono
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de dados
- **JSON Server** - API simulada

## 📦 Instalação

```bash
npm install
```

## 🏃 Executar o projeto

Você precisa rodar dois terminais:

### Terminal 1 - Frontend (Vite)
```bash
npm run dev
```
Aplicação rodando em: http://localhost:5173

### Terminal 2 - Backend (JSON Server)
```bash
npm run dev:server
```
API rodando em: http://localhost:3000

## 📁 Estrutura do Projeto

```
src/
├── routes/           # Rotas do TanStack Router
│   ├── __root.tsx   # Layout raiz
│   └── index.tsx    # Página inicial
├── components/       # Componentes reutilizáveis
│   ├── Header.tsx
│   ├── FilterTabs.tsx
│   └── EmptyState.tsx
├── lib/             # Configurações
│   ├── router.ts
│   └── queryClient.ts
├── types/           # Tipos TypeScript
│   └── transaction.ts
└── main.tsx         # Entry point
```

## 🎨 Features Implementadas

- ✅ Tela inicial com design do Figma
- ✅ Header com logo Planey e botão "Novo valor"
- ✅ Filtros por tipo: Todos, Entradas, Saídas, Excluídos
- ✅ Estado vazio (Empty state)
- ✅ Roteamento com query params
- ✅ Integração com TanStack Query pronta

## 📝 API Endpoints

O JSON Server expõe automaticamente os seguintes endpoints:

- `GET    /transactions` - Listar todas as transações
- `GET    /transactions/:id` - Buscar transação por ID
- `POST   /transactions` - Criar nova transação
- `PUT    /transactions/:id` - Atualizar transação
- `PATCH  /transactions/:id` - Atualizar parcialmente
- `DELETE /transactions/:id` - Deletar transação

### Query Params suportados

- `_page` - Número da página
- `_limit` - Limite de resultados por página
- `_sort` - Campo para ordenação
- `_order` - Ordem (asc/desc)

Exemplo:
```
GET /transactions?_page=1&_limit=10&_sort=createdAt&_order=desc
```
