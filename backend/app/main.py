"""
🎓 main.py — PONTO DE ENTRADA do backend FastAPI

Este arquivo cria a aplicação FastAPI e configura:
1. O título e versão da API (vem do config.py → .env)
2. O CORS (Cross-Origin Resource Sharing)
3. As rotas da API (via router)

🎓 O QUE É CORS?
Quando o frontend (http://localhost:5173) tenta acessar
a API (http://localhost:8000), o navegador BLOQUEIA por
segurança — são "origens" diferentes (portas diferentes).

O middleware CORS diz ao navegador: "está tudo bem,
essas origens podem se comunicar". Sem ele, o frontend
NÃO consegue chamar a API.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.main import api_router

app = FastAPI(title=settings.PROJECT_NAME, version=settings.PROJECT_VERSION)

# Configuração do CORS — permite o frontend acessar a API
app.add_middleware(
    CORSMiddleware,
    # Origens permitidas (endereços do frontend)
    allow_origins=[
        "http://localhost:5173",      # Vite dev server local
        "http://127.0.0.1:5173",      # Alternativa localhost
        "http://frontend:5173",       # Dentro do Docker Compose
    ],
    allow_credentials=True,           # Permite enviar cookies
    allow_methods=["*"],              # Permite GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],              # Permite qualquer header
)

app.include_router(api_router, prefix=settings.API_V1_STR)