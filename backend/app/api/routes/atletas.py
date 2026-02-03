from fastapi import APIRouter, HTTPException
from app.api.deps import SessionDep
from app import crud
from app.models import Atleta, AtletaCreate, AtletaPublic

router = APIRouter()

@router.post("/", response_model=AtletaPublic, status_code=201)
async def create_atleta(atleta_in: AtletaCreate, session: SessionDep):
    try:
        return await crud.create_atleta(session, atleta_in)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/", response_model=list[AtletaPublic])
async def read_atletas(session: SessionDep):
    atletas = await crud.get_atletas(session)
    return atletas
    