from fastapi import APIRouter
from app.api.routes import categorias, atletas

api_router = APIRouter()
api_router.include_router(categorias.router, prefix="/categorias", tags=["Categorias"])
api_router.include_router(atletas.router, prefix="/atletas", tags=["Atletas"])
