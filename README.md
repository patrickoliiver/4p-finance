# 4P Finance 💰

Aplicação de gerenciamento financeiro desenvolvida com React, TypeScript e as melhores práticas de desenvolvimento frontend moderno.

![Stack](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![TanStack](https://img.shields.io/badge/TanStack-Query%20%26%20Router-red)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1-cyan)

## 🚀 Tecnologias

### Core
- **React 19** - Biblioteca UI com as últimas features
- **TypeScript 5.9** - Tipagem estática e segurança
- **Vite 7** - Build tool extremamente rápida
- **Tailwind CSS 4** - Estilização utility-first

### UI Components
- **Radix UI** - Componentes acessíveis e sem estilo
  - Dialog - Modais e overlays
  - Icons - Biblioteca de ícones
- **Radix Icons** - Ícones consistentes e otimizados

### Estado e Dados
- **TanStack Query** - Gerenciamento de estado assíncrono e cache inteligente
- **TanStack Router** - Roteamento type-safe com query params
- **JSON Server** - API REST simulada para desenvolvimento

### Formulários
- **React Hook Form** - Gerenciamento performático de formulários
- **Zod** - Validação de schemas com TypeScript
- **@hookform/resolvers** - Integração Zod + RHF

### Utilidades
- **date-fns** - Manipulação e formatação de datas

## 📦 Instalação

```bash
# Clone o repositório
git clone <seu-repositorio>

# Instale as dependências
npm install
```

## 🏃 Como Rodar

A aplicação precisa de **dois processos rodando simultaneamente**:

### Terminal 1 - Frontend (Vite)
```bash
npm run dev
```
🌐 Aplicação: http://localhost:5173

### Terminal 2 - Backend (JSON Server)
```bash
npm run dev:server
```
🔌 API: http://localhost:3000

## 🏗️ Arquitetura do Projeto

```
src/
├── components/          # Componentes React reutilizáveis
│   ├── Header.tsx       # Cabeçalho com logo e botão "Novo valor"
│   ├── FilterTabs.tsx   # Tabs de filtro (Todos, Entradas, Saídas, Excluídos)
│   ├── TransactionTable.tsx    # Tabela de transações
│   ├── Pagination.tsx           # Controles de paginação
│   ├── EmptyState.tsx          # Estado vazio
│   ├── NewTransactionModal.tsx # Modal de criação
│   └── EditTransactionModal.tsx# Modal de edição
│
├── routes/             # Rotas do TanStack Router
│   ├── __root.tsx     # Layout raiz
│   └── index.tsx      # Página inicial
│
├── hooks/             # Custom hooks
│   └── useTransactions.ts  # Hooks do TanStack Query
│
├── services/          # Camada de serviço
│   └── api.ts        # Comunicação com API
│
├── schemas/          # Schemas de validação Zod
│   └── transaction.ts
│
├── types/            # Definições TypeScript
│   └── transaction.ts
│
├── utils/            # Funções auxiliares
│   └── currency.ts   # Formatação de moeda BRL
│
├── lib/              # Configurações
│   ├── queryClient.ts   # Setup do TanStack Query
│   └── router.ts        # Setup do TanStack Router
│
└── main.tsx          # Entry point da aplicação
```

## 🎯 Features Implementadas

### ✅ CRUD Completo
- ✨ Criar nova transação
- 📝 Editar transação existente
- 🗑️ Soft delete (exclusão lógica)
- ♻️ Restaurar transações deletadas

### ✅ Filtros e Paginação
- 🔍 Filtrar por tipo (Entradas / Saídas)
- 📋 Visualizar todos os registros
- 🗃️ Ver apenas itens excluídos
- 📄 Paginação com controle de itens por página
- 🔗 **Tudo controlado por URL** (query params)

### ✅ Modais Controlados por URL
- `?modal=new` - Abre modal de criação
- `?modal=edit&id=tx_xxx` - Abre modal de edição
- Navegação com histórico do navegador
- Deep linking funcionando perfeitamente

### ✅ Validação de Formulários
- Validação em tempo real com Zod
- Valor deve ser numérico
- Valor deve ser positivo
- Valor deve ser diferente de zero
- Feedback visual de erros

### ✅ Formatação de Moeda
- Máscara de moeda brasileira (R$)
- Formatação em tempo real enquanto digita
- Conversão automática para centavos
- Exibição formatada na listagem

### ✅ Estados da UI
- Loading states com skeletons
- Empty states informativos
- Error states tratados
- Confirmação antes de deletar

### ✅ Cache Inteligente
- TanStack Query gerencia cache automaticamente
- Invalidação estratégica de queries
- Refetch otimizado
- Experiência fluida sem requisições redundantes

## 🔄 Fluxo de Dados

```
User Action
    ↓
Component (UI)
    ↓
Custom Hook (useTransactions)
    ↓
TanStack Query (Cache Layer)
    ↓
API Service (api.ts)
    ↓
JSON Server (Backend simulado)
```

## 📡 Endpoints da API

O JSON Server expõe automaticamente:

```
GET    /transactions              # Listar todas
GET    /transactions?_page=1&_limit=10  # Com paginação
GET    /transactions?type=income         # Filtrar por tipo
GET    /transactions?deletedAt=null      # Apenas não-deletados
GET    /transactions/:id                 # Buscar por ID
POST   /transactions                     # Criar nova
PATCH  /transactions/:id                 # Atualizar (parcial)
PUT    /transactions/:id                 # Atualizar (completo)
DELETE /transactions/:id                 # Deletar (não usado - usamos soft delete)
```

### Soft Delete
Ao invés de deletar permanentemente, fazemos:
```typescript
PATCH /transactions/:id
{
  "deletedAt": "2026-01-29T12:00:00.000Z",
  "updatedAt": "2026-01-29T12:00:00.000Z"
}
```

## 🧪 Como Testar

### 1. Criar Nova Transação
- Clique em "Novo valor"
- Selecione o tipo (Entrada/Saída)
- Digite um valor (ex: 1500)
- Clique em "Salvar"
- ✅ Transação aparece na lista

### 2. Editar Transação
- Clique em qualquer item da lista
- Modal abre com dados preenchidos
- Altere o tipo ou valor
- Clique em "Salvar"
- ✅ Mudanças refletidas imediatamente

### 3. Deletar Transação
- Clique no ícone de lixeira em um item
- Confirme a exclusão
- ✅ Item removido da lista atual
- ✅ Item aparece na tab "Excluídos"

### 4. Restaurar Transação
- Vá para a tab "Excluídos"
- Clique no item para abrir modal
- OU clique no botão de restaurar
- ✅ Item volta para as tabs normais

### 5. Filtros
- Teste cada filtro: Todos, Entradas, Saídas, Excluídos
- ✅ URL muda: `?filter=income`
- ✅ Dados filtrados corretamente
- ✅ Refresh da página mantém filtro

### 6. Paginação
- Com mais de 10 itens, veja a paginação
- Navegue entre páginas
- ✅ URL muda: `?page=2`
- ✅ Dados carregam corretamente
- ✅ Refresh mantém a página

## 🎨 Decisões Técnicas

### Por que TanStack Query?
- Cache automático e inteligente
- Refetch strategies configuráveis
- Mutations com invalidação otimizada
- Developer tools excelentes
- Reduz drasticamente código boilerplate

### Por que TanStack Router?
- Type-safety completo
- Query params validados com Zod
- File-based routing
- Integração perfeita com Query
- Deep linking nativo

### Por que Radix UI?
- Acessibilidade built-in (WCAG)
- Headless (controle total do estilo)
- Composable e flexível
- Mantido pela Vercel
- Sem conflitos com Tailwind

### Por que Soft Delete?
- Permite restauração de dados
- Histórico completo mantido
- Melhor UX (desfazer ações)
- Audit trail natural
- Compliance com LGPD/GDPR

### Estrutura de Pastas
- **Separação por tipo** (components, hooks, services)
- **Colocation** quando faz sentido
- **Barrel exports** evitados (tree-shaking)
- **Naming conventions** claras e consistentes

## 🚧 Melhorias Futuras

- [ ] Testes E2E com Playwright
- [ ] Toast notifications (react-hot-toast)
- [ ] Filtros combinados (tipo + data + valor)
- [ ] Ordenação por coluna
- [ ] Export para CSV/Excel
- [ ] Gráficos e dashboards
- [ ] Dark/Light mode toggle
- [ ] PWA com cache offline
- [ ] Autenticação e multi-usuário

## 📄 Licença

MIT

---

Desenvolvido com ❤️ usando as melhores práticas do ecossistema React
