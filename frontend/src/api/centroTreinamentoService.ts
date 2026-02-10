/*
  🎓 api/centroTreinamentoService.ts — SERVIÇO DE API para Centros de Treinamento

  Mesmo padrão do categoriaService, mas para a entidade CentroTreinamento.
  Cada serviço é responsável por UMA entidade.
*/

import api from './client';
import type { CentroTreinamento, CentroTreinamentoCreate } from '../types';

export const centroTreinamentoService = {
    /**
     * Busca TODOS os centros de treinamento
     * GET /centros_treinamento/
     */
    async getAll(): Promise<CentroTreinamento[]> {
        const response = await api.get<CentroTreinamento[]>('/centros_treinamento/');
        return response.data;
    },

    /**
     * Cria um NOVO centro de treinamento
     * POST /centros_treinamento/
     */
    async create(data: CentroTreinamentoCreate): Promise<CentroTreinamento> {
        const response = await api.post<CentroTreinamento>('/centros_treinamento/', data);
        return response.data;
    },
};
