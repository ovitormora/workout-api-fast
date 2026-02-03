import uuid 
from datetime import datetime
from sqlmodel import SQLModel, Field, Relationship

class CategoriaBase(SQLModel):
    nome: str = Field(index=True,unique=True, min_length=3, max_length=50)

class Categoria(CategoriaBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    
    # Um para muitos
    atletas: list["Atleta"] = Relationship(back_populates="categoria")

class CategoriaCreate(CategoriaBase):
    pass

class CategoriaPublic(CategoriaBase):
    id: uuid.UUID

class CentroTreinamentoBase(SQLModel):
    nome: str = Field(index=True, min_length=3, max_length=50)
    endereco: str = Field(index=True, min_length=5, max_length=100)
    proprietario: str = Field(index=True, min_length=3, max_length=50)

class CentroTreinamento(CentroTreinamentoBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    
    atletas: list["Atleta"] = Relationship(back_populates="centro_treinamento") 

class CentroTreinamentoCreate(CentroTreinamentoBase):
    pass

class CentroTreinamentoPublic(CentroTreinamentoBase):
    id: uuid.UUID

class AtletaBase(SQLModel):
    nome: str = Field(index=True, min_length=3, max_length=50)
    cpf: str = Field(index=True, unique=True, min_length=11, max_length=11)
    idade: int = Field(gt=0)
    peso: float = Field(gt=0)
    altura: float = Field(gt=0)
    sexo: str = Field(max_length=1)

class Atleta(AtletaBase,table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # FK
    categoria_id: uuid.UUID = Field(foreign_key="categoria.id")
    centro_treinamento_id: uuid.UUID = Field(foreign_key="centrotreinamento.id")

    # Relações
    categoria: Categoria = Relationship(back_populates="atletas")
    centro_treinamento: CentroTreinamento = Relationship(back_populates="atletas")

class AtletaCreate(AtletaBase):
    categoria_nome: str
    centro_treinamento_nome: str

class AtletaPublic(AtletaBase):
    id: uuid.UUID
    categoria: CategoriaPublic
    centro_treinamento: CentroTreinamentoPublic
