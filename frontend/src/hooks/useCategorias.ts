/*
  🎓 hooks/useCategorias.ts — CUSTOM HOOK para Categorias

  🎓 O QUE É UM CUSTOM HOOK?
  É uma função que começa com "use" e encapsula lógica 
  reutilizável. Hooks são a forma do React de compartilhar
  lógica entre componentes SEM duplicar código.

  🎓 O QUE ESTE HOOK FAZ?
  Gerencia o ciclo completo de dados das categorias:
  1. Busca a lista de categorias da API
  2. Controla o estado de "carregando" (loading)
  3. Controla erros
  4. Oferece função para criar nova categoria
  5. Recarrega a lista automaticamente após criar

  🎓 HOOKS DO React USADOS AQUI:
  - useState: cria uma "variável reativa". Quando muda,
    o componente re-renderiza (atualiza a tela).
  - useEffect: executa código quando o componente "monta"
    (aparece na tela) ou quando dependências mudam.
  - useCallback: memoriza uma função para evitar 
    re-criações desnecessárias (otimização).
*/

import { useState, useEffect, useCallback } from 'react';
import { categoriaService } from '../api/categoriaService';
import type { Categoria, CategoriaCreate } from '../types';

export function useCategorias() {
    // 🎓 useState cria variáveis reativas:
    // [valor, funcaoParaAlterar] = useState(valorInicial)
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Função que busca categorias da API
    const fetchCategorias = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await categoriaService.getAll();
            setCategorias(data);
        } catch (err) {
            setError('Erro ao carregar categorias');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Função que cria uma nova categoria e recarrega a lista
    const createCategoria = useCallback(async (data: CategoriaCreate) => {
        const nova = await categoriaService.create(data);
        // Recarrega a lista para incluir a nova categoria
        await fetchCategorias();
        return nova;
    }, [fetchCategorias]);

    // 🎓 useEffect com [] vazio = executa UMA VEZ quando o componente monta
    useEffect(() => {
        fetchCategorias();
    }, [fetchCategorias]);

    // Retorna tudo que o componente precisa
    return {
        categorias,       // Lista de categorias
        loading,          // true enquanto carrega
        error,            // Mensagem de erro (ou null)
        createCategoria,  // Função para criar
        refetch: fetchCategorias, // Função para recarregar
    };
}
