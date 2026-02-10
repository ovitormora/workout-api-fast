# My Workout API — Roadmap de Desenvolvimento

## Fase 1 — Fundação ✅
- [x] Inicializar projeto Vite + React + TypeScript
- [x] Configurar estrutura de pastas (`api/`, `components/`, `hooks/`, `pages/`, `layouts/`, `types/`, `utils/`, `styles/`)
- [x] Criar design system (`global.css` — cores, tipografia, espaçamentos)
- [x] Criar `Dockerfile` multi-stage para o frontend
- [x] Atualizar `compose.yml` com serviço frontend (porta 5173)
- [x] Configurar CORS no backend (`main.py`)
- [x] Criar `entrypoint.sh` para migrações automáticas
- [x] Criar arquivo `.env` com variáveis do PostgreSQL

## Fase 2 — Camada de Dados ✅
- [x] Instalar Axios
- [x] Criar tipos TypeScript das entidades (`types/index.ts`)
- [x] Configurar cliente Axios com `baseURL` (`api/client.ts`)
- [x] Criar serviços de API (`categoriaService`, `centroTreinamentoService`, `atletaService`)
- [x] Criar custom hooks (`useCategorias`, `useCentrosTreinamento`, `useAtletas`)

## Fase 3 — Componentes Base
- [ ] Layout principal (sidebar + conteúdo)
- [ ] Componentes reutilizáveis: `Button`, `Input`, `Select`, `Modal`, `Table`, `Card`
- [ ] Configurar React Router com as rotas

## Fase 4 — Páginas
- [ ] Dashboard com contadores
- [ ] CRUD de Categorias
- [ ] CRUD de Centros de Treinamento
- [ ] CRUD de Atletas (com selects de Categoria e CT)

## Fase 5 — Polimento
- [ ] Animações e transições
- [ ] Estados de loading e empty states
- [ ] Tratamento de erros com toast notifications
- [ ] Responsividade mobile
- [ ] Dark mode
