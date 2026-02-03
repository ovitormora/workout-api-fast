from fastapi import APIRouter, HTTPException
from app.api.deps import SessionDep
from app import crud
from app.models import Categoria, CategoriaCreate, CategoriaPublic

router = APIRouter()

@router.post("/", response_model=CategoriaPublic, status_code=201)
async def create_categoria(categoria_in: CategoriaCreate, session: SessionDep): 
    categoria_existente= await crud.get_categoria_by_nome(session, nome=categoria_in.nome)
    if categoria_existente:
        raise HTTPException(status_code=400, detail="Categoria já existe")
    categoria = await crud.create_categoria(session, categoria_in)
    return categoria

@router.get("/", response_model=list[CategoriaPublic])
async def read_categorias(session: SessionDep):
    return await crud.get_categorias(session)
