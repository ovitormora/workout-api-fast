from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from sqlmodel import select

from app.models import (
    Atleta,
    AtletaCreate,
    Categoria,
    CategoriaCreate,
    CentroTreinamento,
    CentroTreinamentoCreate,
)


async def create_categoria(
    session: AsyncSession, categoria_in: CategoriaCreate
) -> Categoria:
    db_obj = Categoria.model_validate(categoria_in)
    session.add(db_obj)
    await session.commit()
    await session.refresh(db_obj)
    return db_obj

async def get_categoria_by_nome(session: AsyncSession, nome: str) -> Categoria | None:
    query = select(Categoria).where(Categoria.nome == nome)
    result = await session.execute(query)
    return result.first()

async def get_categorias(session: AsyncSession) -> list[Categoria]:
    query = select(Categoria)
    result = await session.execute(query)
    return result.scalars().all()

async def create_centro_treinamento(
    session: AsyncSession, ct_in: CentroTreinamentoCreate
) -> CentroTreinamento:
    db_obj = CentroTreinamento.model_validate(ct_in)
    session.add(db_obj)
    await session.commit()
    await session.refresh(db_obj)
    return db_obj

async def get_centro_treinamento_by_nome(
    session: AsyncSession, nome: str
) -> CentroTreinamento | None:
    query = select(CentroTreinamento).where(CentroTreinamento.nome == nome)
    result = await session.execute(query)
    return result.first()

async def get_centro_treinamentos(session: AsyncSession) -> list[CentroTreinamento]:
    query = select(CentroTreinamento)
    result = await session.execute(query)
    return result.scalars().all()

async def create_atleta(session: AsyncSession, atleta_in: AtletaCreate) -> Atleta:
    categoria = await get_categoria_by_nome(session,atleta_in.categoria_nome)
    if not categoria:
        raise Exception(f"Categoria {atleta_in.categoria_nome} não encontrada")
    ct = await get_centro_treinamento_by_nome(session,atleta_in.centro_treinamento_nome)
    if not ct:
        raise Exception(
            f"Centro de treinamento {atleta_in.centro_treinamento_nome} não encontrado"
        )

    atleta_data = atleta_in.model_dump(
        exclude={"categoria_nome","centro_treinamento_nome"}
    )
    
    db_atleta = Atleta(
        **atleta_data,
        categoria_id=categoria.id,
        centro_treinamento_id=ct.id
    )
    session.add(db_atleta)
    await session.commit()
    await session.refresh(db_atleta)
    return db_atleta

async def get_atletas(session: AsyncSession) -> list[Atleta]:

    query = select(Atleta).options(
        selectinload(Atleta.categoria),
        selectinload(Atleta.centro_treinamento)
    )
    result = await session.exec(query)
    return result.all()