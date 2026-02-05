from fastapi import APIRouter, HTTPException
from app.api.deps import SessionDep
from app import crud
from app.models import CentroTreinamento, CentroTreinamentoCreate, CentroTreinamentoPublic

router = APIRouter()

@router.post("/", response_model=CentroTreinamentoPublic, status_code=201)
async def create_centro_treinamento(ct_in: CentroTreinamentoCreate, session: SessionDep):
    ct_existente = await crud.get_centro_treinamento_by_nome(session, nome=ct_in.nome)
    if ct_existente:
        raise HTTPException(status_code=400, detail="Centro de treinamento já existe")
    ct = await crud.create_centro_treinamento(session, ct_in)
    return ct

@router.get("/", response_model=list[CentroTreinamentoPublic])
async def read_centros_treinamento(session: SessionDep):
    return await crud.get_centro_treinamentos(session)
