from fastapi import APIRouter
from app.api.routes import categorias, atletas, centros_treinamento

api_router = APIRouter()
api_router.include_router(categorias.router, prefix="/categorias", tags=["Categorias"])
api_router.include_router(atletas.router, prefix="/atletas", tags=["Atletas"])
api_router.include_router(centros_treinamento.router, prefix="/centros_treinamento", tags=["Centros de Treinamento"])
