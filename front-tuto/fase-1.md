# Walkthrough — Fase 1: Fundação do Frontend

## O que foi feito

A Fase 1 preparou toda a base do frontend para que as próximas fases (componentes, páginas) tenham uma fundação sólida.

---

## 1. Inicialização do Projeto (Vite + React + TypeScript)

**Comando executado:**
```bash
npx -y create-vite@latest frontend --template react-ts --no-interactive
```

> **O que é cada tecnologia?**
> - **Vite** — Ferramenta de build ultrarrápida. Substitui o antigo Create React App. Oferece *Hot Module Replacement* (HMR): quando você salva um arquivo, a mudança aparece no navegador INSTANTANEAMENTE, sem recarregar a página inteira.
> - **React** — Biblioteca para construir interfaces com *componentes* (peças reutilizáveis de UI).
> - **TypeScript** — JavaScript com *tipos*. Ajuda a evitar erros antes de rodar o código (ex: passar `string` onde deveria ser `number`).

---

## 2. Estrutura de Pastas

```
frontend/src/
├── api/            → Chamadas HTTP para o backend (Axios)
├── components/     → Componentes reutilizáveis (Button, Modal, Table...)
├── hooks/          → Custom hooks (lógica reutilizável)
├── layouts/        → Layout principal (sidebar + conteúdo)
├── pages/          → Uma pasta por página/rota
├── styles/         → CSS global e design system
├── types/          → Tipos TypeScript das entidades
├── utils/          → Funções auxiliares (formatCPF, etc.)
├── App.tsx         → Componente raiz
└── main.tsx        → Ponto de entrada (renderiza o App)
```

> **Por que organizar assim?** Cada pasta tem UMA responsabilidade clara. Quando o projeto crescer, você sabe exatamente onde procurar cada coisa. Isso é chamado de *Separation of Concerns*.

---

## 3. Design System — `global.css`

O design system define as "regras visuais" do projeto via **CSS Custom Properties** (variáveis):

| Token | Exemplo | Para que serve |
|---|---|---|
| `--color-primary` | `#6C5CE7` | Cor principal (roxo) |
| `--color-bg-primary` | `#0F0F1A` | Fundo escuro (dark mode) |
| `--font-family` | `Inter` | Fonte moderna do Google Fonts |
| `--spacing-md` | `1rem` | Espaçamento padrão |
| `--radius-md` | `10px` | Arredondamento de bordas |
| `--transition-normal` | `250ms ease` | Animações suaves |

> **Vantagem das variáveis CSS:** Para mudar TODA a paleta de cores da aplicação, basta editar o `global.css`. Todos os componentes que usam `var(--color-primary)` mudam automaticamente.

---

## 4. Dockerfile do Frontend

Multi-stage build com 2 estágios:
- **`dev`** — Roda o Vite dev server com hot reload (porta 5173)
- **`prod`** — Faz build estático e serve com Nginx

---

## 5. Docker Compose Atualizado

Adicionado o serviço `frontend` com:
- Build do `target: dev`
- Volume mount para hot reload
- `docker compose watch` configurado para sincronizar `src/`

---

## 6. CORS no Backend

Adicionado middleware CORS para permitir que o frontend (`localhost:5173`) chame a API (`localhost:8000`).

> **Sem CORS, o navegador bloqueia as chamadas.** O frontend e o backend rodam em portas diferentes — o navegador trata isso como "origens diferentes" e bloqueia por segurança. O middleware CORS autoriza a comunicação.

---

## Como Testar

```bash
# Suba tudo de uma vez
docker compose up --build

# Acesse:
# Frontend → http://localhost:5173
# Backend  → http://localhost:8000/docs
```
