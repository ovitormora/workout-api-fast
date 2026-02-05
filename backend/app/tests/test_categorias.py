import pytest 
from httpx import AsyncClient
from app.models import Categoria

async def test_create_categoria(client: AsyncClient): 
    payload = {"nome":"Musculação"} 
    response = await client.post("/api/v1/categorias/", json=payload) 

    assert response.status_code == 201
    content = response.json()
    assert content["nome"] == payload["nome"]
    assert "id" in content 

async def test_create_categoria_duplicada(client: AsyncClient):
    await client.post("/api/v1/categorias/", json={"nome": "Corrida"})
    
    response = await client.post("/api/v1/categorias/", json={"nome": "Corrida"})
    
    assert response.status_code == 400
    assert response.json()["detail"] == "Categoria já existe"