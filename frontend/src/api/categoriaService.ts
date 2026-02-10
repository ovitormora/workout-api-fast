/*
  🎓 api/categoriaService.ts — SERVIÇO DE API para Categorias

  Um "serviço" encapsula TODAS as chamadas HTTP de uma entidade.
  Isso mantém a lógica de rede separada dos componentes React.

  🎓 POR QUE SEPARAR EM SERVIÇOS?
  Se amanhã a URL mudar ou a API mudar de formato, você altera
  APENAS este arquivo — nenhum componente precisa mudar.
  Isso é o princípio da "Separação de Responsabilidades".

  🎓 O QUE SÃO async/await?
  São palavras-chave para lidar com operações assíncronas
  (que demoram, como chamadas HTTP). O "await" pausa a 
  execução até a resposta chegar, sem travar a interface.
*/

import api from './client';
import type { Categoria, CategoriaCreate } from '../types';

export const categoriaService = {
    /**
     * Busca TODAS as categorias da API
     * GET /categorias/
     */
    async getAll(): Promise<Categoria[]> {
        const response = await api.get<Categoria[]>('/categorias/');
        return response.data;
    },

    /**
     * Cria uma NOVA categoria
     * POST /categorias/
     */
    async create(data: CategoriaCreate): Promise<Categoria> {
        const response = await api.post<Categoria>('/categorias/', data);
        return response.data;
    },
};
