from sqlalchemy.ext.asyncio import create_async_engine
from sqlmodel import SQLModel

from app.core.config import settings

# "True e Echo" servem para ajudar o debug durante o dev
engine = create_async_engine(
    str(settings.SQLALCHEMY_DATABASE_URI),
    echo=True,
    future=True
)

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)

        