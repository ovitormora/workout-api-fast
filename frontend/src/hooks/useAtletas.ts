/*
  🎓 hooks/useAtletas.ts — CUSTOM HOOK para Atletas

  Mesmo padrão dos outros hooks. Gerencia:
  - Lista de atletas (com categoria e CT inclusos)
  - Estado de loading e error
  - Criação de novos atletas
*/

import { useState, useEffect, useCallback } from 'react';
import { atletaService } from '../api/atletaService';
import type { Atleta, AtletaCreate } from '../types';

export function useAtletas() {
    const [atletas, setAtletas] = useState<Atleta[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAtletas = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await atletaService.getAll();
            setAtletas(data);
        } catch (err) {
            setError('Erro ao carregar atletas');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const createAtleta = useCallback(async (data: AtletaCreate) => {
        const novo = await atletaService.create(data);
        await fetchAtletas();
        return novo;
    }, [fetchAtletas]);

    useEffect(() => {
        fetchAtletas();
    }, [fetchAtletas]);

    return {
        atletas,
        loading,
        error,
        createAtleta,
        refetch: fetchAtletas,
    };
}
