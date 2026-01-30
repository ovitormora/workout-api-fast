from fastapi import FastAPI

app = FastAPI(title="Workout API Enterprise")

@app.get("/")
def read_root():
    return {"message": "Ambiente robusto configurado com sucesso!"}