import pytest
from httpx import AsyncClient

async def test_create_centro_treinamento(client: AsyncClient):
    payload = {
        "nome": "CT Ironberg",
        "endereco": "Rua teste, 123",
        "proprietario": "Renato Cariani"
    }
    response = await client.post("/api/v1/centros_treinamento/", json=payload)

    assert response.status_code == 201
    content = response.json()
    assert content["nome"] == payload["nome"]
    assert content["endereco"] == payload["endereco"]
    assert content["proprietario"] == payload["proprietario"]
    assert "id" in content

async def test_create_centro_treinamento_duplicado(client: AsyncClient):
    payload = {
        "nome": "CT Duplicado",
        "endereco": "Rua duplicada, 000",
        "proprietario": "Ninguem"
    }
    await client.post("/api/v1/centros_treinamento/", json=payload)
    
    response = await client.post("/api/v1/centros_treinamento/", json=payload)
    
    assert response.status_code == 400
    assert response.json()["detail"] == "Centro de treinamento já existe"
