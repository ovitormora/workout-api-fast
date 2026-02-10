/*
  🎓 types/index.ts — TIPOS TypeScript das entidades

  Aqui definimos a "forma" dos dados que vem da API.
  
  🎓 O QUE É UMA INTERFACE TypeScript?
  É um "contrato" que descreve a estrutura de um objeto.
  Por exemplo, se a API retorna um atleta com { id, nome, cpf... },
  criamos uma interface para dizer ao TypeScript exatamente
  quais campos existem e de que tipo são.

  🎓 POR QUE USAR TIPOS?
  1. O editor autocompleta os campos (ex: atleta.nome)
  2. Erros de digitação são pegos ANTES de rodar o código
  3. Funciona como documentação viva do que a API retorna

  🎓 CONVENÇÃO
  - Tipos que vem da API (resposta): Categoria, Atleta, etc.
  - Tipos para CRIAR dados (envio): CategoriaCreate, AtletaCreate, etc.
  Espelham exatamente os schemas do backend (models.py).
*/

// ==========================================
// CATEGORIA
// ==========================================

/** Dados necessários para CRIAR uma categoria */
export interface CategoriaCreate {
    nome: string;
}

/** Categoria retornada pela API (com ID gerado pelo banco) */
export interface Categoria {
    id: string;     // UUID vem como string no JSON
    nome: string;
}

// ==========================================
// CENTRO DE TREINAMENTO
// ==========================================

/** Dados necessários para CRIAR um centro de treinamento */
export interface CentroTreinamentoCreate {
    nome: string;
    endereco: string;
    proprietario: string;
}

/** Centro de treinamento retornado pela API */
export interface CentroTreinamento {
    id: string;
    nome: string;
    endereco: string;
    proprietario: string;
}

// ==========================================
// ATLETA
// ==========================================

/** Dados necessários para CRIAR um atleta */
export interface AtletaCreate {
    nome: string;
    cpf: string;
    idade: number;
    peso: number;
    altura: number;
    sexo: string;
    categoria_nome: string;            // Nome da categoria (não o ID)
    centro_treinamento_nome: string;   // Nome do CT (não o ID)
}

/** Atleta retornado pela API (com categoria e CT inclusos) */
export interface Atleta {
    id: string;
    nome: string;
    cpf: string;
    idade: number;
    peso: number;
    altura: number;
    sexo: string;
    categoria: Categoria;              // Objeto completo, não só o ID
    centro_treinamento: CentroTreinamento;
}
