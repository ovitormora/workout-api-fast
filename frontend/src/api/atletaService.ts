/*
  🎓 api/atletaService.ts — SERVIÇO DE API para Atletas

  Mesmo padrão dos outros serviços, mas para a entidade Atleta.
  Note que ao criar um atleta, enviamos o NOME da categoria
  e do centro de treinamento (não o ID) — o backend resolve.
*/

import api from './client';
import type { Atleta, AtletaCreate } from '../types';

export const atletaService = {
    /**
     * Busca TODOS os atletas (com categoria e CT inclusos)
     * GET /atletas/
     */
    async getAll(): Promise<Atleta[]> {
        const response = await api.get<Atleta[]>('/atletas/');
        return response.data;
    },

    /**
     * Cria um NOVO atleta
     * POST /atletas/
     */
    async create(data: AtletaCreate): Promise<Atleta> {
        const response = await api.post<Atleta>('/atletas/', data);
        return response.data;
    },
};
