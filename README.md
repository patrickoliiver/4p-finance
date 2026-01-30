# 4P Finance 💰

Aplicação de gerenciamento financeiro desenvolvida com React, TypeScript e Tailwind CSS.

## 📦 Instalação

```bash
# Instale as dependências
npm install
```

## 🏃 Como Rodar

A aplicação precisa de **dois processos rodando simultaneamente**:

### Terminal 1 - Frontend
```bash
npm run dev
```
🌐 Aplicação disponível em: http://localhost:5173

### Terminal 2 - Backend (API Simulada)
```bash
npm run dev:server
```
🔌 API disponível em: http://localhost:3001

## 🎯 Decisões Técnicas

### Arquitetura e Stack
- **React 19** com **TypeScript** para type-safety
- **Vite** como build tool para desenvolvimento rápido
- **Tailwind CSS 4** para estilização utility-first
- **TanStack Query** para gerenciamento de estado assíncrono e cache
- **TanStack Router** para roteamento type-safe com query params
- **Radix UI** para componentes acessíveis (Dialog, Toast, Icons)
- **React Hook Form + Zod** para validação de formulários
- **JSON Server** como backend simulado

### Principais Features
- CRUD completo de transações (criar, editar, excluir, restaurar)
- Soft delete (exclusão lógica) para permitir restauração
- Filtros por tipo (Entradas/Saídas) e status (Ativos/Excluídos)
- Paginação com controle por URL
- Modais controlados por query params (`?modal=new`, `?modal=edit&id=xxx`)
- Validação de formulários em tempo real
- Formatação de moeda brasileira (R$)
- Cache inteligente com invalidação otimizada

### Estrutura do Projeto
```
src/
├── components/       # Componentes React (Header, FilterTabs, TransactionTable, etc.)
├── routes/          # Rotas do TanStack Router
├── hooks/           # Custom hooks (useTransactions)
├── services/        # Camada de API (api.ts)
├── schemas/         # Validação Zod (transaction.ts)
├── types/           # Tipos TypeScript
├── utils/           # Funções auxiliares (currency.ts)
└── lib/             # Configurações (queryClient, router)
```

---

Desenvolvido com ❤️ usando as melhores práticas do ecossistema React
