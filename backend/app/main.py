from fastapi import FastAPI

from app.core.config import settings

print(f"Banco configurado: {settings.SQLALCHEMY_DATABASE_URI}")

app = FastAPI(title="Workout API Enterprise")

@app.get("/")
def read_root():
    return {"message": "Ambiente robusto configurado com sucesso!"}