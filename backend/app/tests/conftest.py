import pytest
from httpx import AsyncClient, ASGITransport
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker 

from app.main import app
from app.core.config import settings
from app.api.deps import get_session 
from app.models import SQLModel

@pytest.fixture(name="session")
async def session_fixture(): 
    engine = create_async_engine(str(settings.SQLALCHEMY_DATABASE_URI)) 
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)
    
    async_session = sessionmaker(
        engine, class_=AsyncSession, expire_on_commit=False
    )
    async with async_session() as session:
        yield session

    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.drop_all)
    await engine.dispose()

@pytest.fixture(name="client")
async def client_fixture(session: AsyncSession):
    def get_session_override():
        return session
    
    app.dependency_overrides[get_session] = get_session_override
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        yield client 

    app.dependency_overrides.clear() 