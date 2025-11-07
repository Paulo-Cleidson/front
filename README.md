# Sistema de Gerenciamento Financeiro Pessoal

Um sistema web moderno para controle financeiro pessoal desenvolvido com **React + TypeScript + Vite**, permitindo o gerenciamento de carteiras e transações financeiras.

## 🚀 Tecnologias Utilizadas

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Roteamento:** React Router DOM
- **Gerenciamento de Estado:** TanStack React Query
- **HTTP Client:** Axios
- **Autenticação:** Token-based (JWT)
- **Backend:** Django REST Framework
- **Estilização:** CSS personalizado + Tailwind CSS

## 📦 Funcionalidades Principais

### 🔐 Autenticação
- Login seguro com token JWT
- Persistência de sessão
- Proteção de rotas privadas

### 💰 Gerenciamento Financeiro
- **Carteiras:** Múltiplas carteiras por usuário
- **Transações:** Registro de receitas (R) e despesas (D)
- **Dashboard:** Resumo financeiro em tempo real
- **Saldo:** Cálculo automático do saldo total

### 📊 Dashboard Interativo
- Visualização do saldo total em tempo real
- Resumo de receitas e despesas
- Histórico de transações
- Atualização automática após novas transações

## 🏗️ Estrutura do Projeto

```
src/
├── api/                 # Serviços de API
│   ├── token.ts        # Autenticação
│   ├── carteiras.ts    # Gerenciamento de carteiras
│   ├── transacoes.ts   # Operações com transações
│   └── resumo.ts       # Dados resumidos
├── components/         # Componentes React
│   ├── atoms/         # Componentes básicos (Input, Button)
│   └── organisms/     # Componentes complexos (LoginForm, TransactionForm)
├── pages/             # Páginas da aplicação
│   ├── LoginPage.tsx  # Página de login
│   └── HomePage.tsx   # Dashboard principal
└── App.tsx           # Configuração de rotas
```

## 🔌 APIs Integradas

### Backend Django
- `POST /api/token/` - Autenticação
- `GET /api/v1/carteiras/` - Listar carteiras
- `GET /api/v1/transacoes/somar-transacoes/` - Resumo financeiro
- `POST /api/v1/transacoes/` - Criar transação

### Frontend Services
- `login()` - Autenticação de usuário
- `listarCarteiras()` - Buscar carteiras do usuário
- `obterResumoTransacoes()` - Obter resumo financeiro
- `criarTransacao()` - Registrar nova transação

## 🎯 Características Técnicas

### Estado e Gerenciamento de Dados
- **Estado Local:** `useState` para estado de componentes
- **Estado do Servidor:** `useMutation` e `useQuery` do TanStack Query
- **Persistência:** `localStorage` para token de autenticação
- **Navegação:** `useNavigate` do React Router

### Segurança
- Token JWT armazenado seguromente
- Interceptores Axios para autenticação automática
- Rotas protegidas baseadas no estado de autenticação

### Performance
- Carregamento assíncrono de dados
- Atualizações em tempo real
- Cache inteligente com React Query

## 🚀 Como Executar

### Pré-requisitos
- Node.js 16+
- Backend Django configurado

### Instalação e Desenvolvimento
```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_API_VERSION=/v1
```

## 📱 Interface do Usuário

### Design System
- **Cores:** Azul empresarial (#02013b), Verde sucesso (#0fa00a)
- **Layout:** Gradiente azul-verde com cards brancos
- **Tipografia:** Inter font family
- **Responsividade:** Design mobile-first

### Componentes Principais
- **Header:** Navegação + saldo do usuário
- **Cards:** Containers para formulários e dados
- **Forms:** Inputs estilizados com validação
- **Buttons:** Ações primárias e secundárias

## 🔄 Fluxo da Aplicação

1. **Login** → Autenticação com token JWT
2. **Dashboard** → Carrega carteiras e resumo
3. **Navegação** → Header com saldo e logout
4. **Transações** → Formulário para novas entradas
5. **Atualização** → Dados atualizados automaticamente

Este projeto oferece uma base sólida para um sistema financeiro pessoal completo, com arquitetura escalável e experiência de usuário moderna.