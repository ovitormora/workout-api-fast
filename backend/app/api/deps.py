from typing import Annotated
from fastapi import Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.orm import sessionmaker

from app.core.db import engine

async_session = sessionmaker(
    engine,
    class_ = AsyncSession,
    expire_on_commit = False
)

async def get_session() -> AsyncSession:
    async with async_session() as session:
        yield session

SessionDep = Annotated[AsyncSession, Depends(get_session)]