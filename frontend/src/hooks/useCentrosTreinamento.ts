/*
  🎓 hooks/useCentrosTreinamento.ts — CUSTOM HOOK para Centros de Treinamento

  Mesmo padrão do useCategorias. Gerencia:
  - Lista de centros de treinamento
  - Estado de loading e error
  - Criação de novos CTs
*/

import { useState, useEffect, useCallback } from 'react';
import { centroTreinamentoService } from '../api/centroTreinamentoService';
import type { CentroTreinamento, CentroTreinamentoCreate } from '../types';

export function useCentrosTreinamento() {
    const [centros, setCentros] = useState<CentroTreinamento[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCentros = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await centroTreinamentoService.getAll();
            setCentros(data);
        } catch (err) {
            setError('Erro ao carregar centros de treinamento');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const createCentro = useCallback(async (data: CentroTreinamentoCreate) => {
        const novo = await centroTreinamentoService.create(data);
        await fetchCentros();
        return novo;
    }, [fetchCentros]);

    useEffect(() => {
        fetchCentros();
    }, [fetchCentros]);

    return {
        centros,
        loading,
        error,
        createCentro,
        refetch: fetchCentros,
    };
}
