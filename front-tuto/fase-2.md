# Walkthrough — Fase 2: Camada de Dados

## O que foi feito

A Fase 2 criou toda a camada que conecta o frontend à API do backend. Agora os componentes React (que criaremos na Fase 3) poderão buscar e enviar dados de forma simples.

---

## 1. Tipos TypeScript — `types/index.ts`

Criamos **interfaces** que descrevem a "forma" dos dados:

```typescript
// O que a API RETORNA
interface Categoria {
  id: string;
  nome: string;
}

// O que ENVIAMOS para criar
interface CategoriaCreate {
  nome: string;
}
```

> **Por que isso importa?** Com tipos definidos, o editor autocompleta `atleta.nome`, `atleta.categoria.nome`, etc. Se você digitar `atleta.nomee` (com erro), o TypeScript avisa ANTES de rodar.

### Mapeamento Backend → Frontend

| Backend (Python)           | Frontend (TypeScript)     |
|---|---|
| `CategoriaBase` + `CategoriaPublic` | `Categoria` |
| `CategoriaCreate`          | `CategoriaCreate`         |
| `CentroTreinamentoPublic`  | `CentroTreinamento`       |
| `AtletaPublic`             | `Atleta`                  |

---

## 2. Cliente Axios — `api/client.ts`

Configuração central de HTTP:

```typescript
const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  timeout: 10000,
});
```

> **Vantagem:** Todos os serviços usam essa mesma instância. Se a URL da API mudar, alteramos em UM lugar só.

---

## 3. Serviços de API — `api/*Service.ts`

Cada entidade tem seu próprio serviço:

| Serviço | Métodos | Rota da API |
|---|---|---|
| `categoriaService` | `getAll()`, `create()` | `/categorias/` |
| `centroTreinamentoService` | `getAll()`, `create()` | `/centros_treinamento/` |
| `atletaService` | `getAll()`, `create()` | `/atletas/` |

> **Padrão usado:** Cada serviço é um objeto com métodos `async`. Isso separa a lógica de rede dos componentes visuais.

---

## 4. Custom Hooks — `hooks/use*.ts`

Cada hook gerencia o ciclo completo de uma entidade:

```
useCategorias() → { categorias, loading, error, createCategoria, refetch }
```

**Ciclo de vida:**
1. Componente monta → `useEffect` dispara → chama `getAll()`
2. Enquanto carrega → `loading = true`
3. Dados chegam → `setCategorias(data)`, `loading = false`
4. Erro? → `error = "mensagem"`, `loading = false`
5. Criar categoria → chama `create()` → recarrega lista

> **Conceitos React importantes:**
> - `useState` — cria variáveis reativas (quando mudam, a tela atualiza)
> - `useEffect` — executa código quando o componente aparece na tela
> - `useCallback` — memoriza funções para evitar re-criações

---

## Arquitetura da Camada de Dados

```
Componente React
      ↓ usa
  Custom Hook (useAtletas)
      ↓ chama
  Serviço de API (atletaService)
      ↓ usa
  Cliente Axios (api/client.ts)
      ↓ HTTP
  Backend FastAPI
```

> Cada camada tem uma responsabilidade. Os componentes NÃO sabem como a API funciona — eles só usam o hook.
