/*
  🎓 api/client.ts — CONFIGURAÇÃO CENTRAL do Axios

  Este arquivo cria uma "instância" do Axios pré-configurada.
  
  🎓 O QUE É O AXIOS?
  É uma biblioteca para fazer chamadas HTTP (GET, POST, PUT, DELETE)
  para a API. É similar ao fetch() nativo do navegador, mas com
  vantagens:
  - Interceptors (middleware para requisições/respostas)
  - Tratamento automático de JSON
  - Timeout configurável
  - Melhor tratamento de erros

  🎓 O QUE É UMA INSTÂNCIA AXIOS?
  Em vez de configurar a URL base em CADA chamada, criamos
  uma instância com as configs padrão. Todos os serviços
  usam essa mesma instância.

  🎓 O QUE É baseURL?
  É o "prefixo" de TODAS as URLs. Assim, ao invés de escrever:
    axios.get("http://localhost:8000/api/v1/atletas")
  Escrevemos apenas:
    api.get("/atletas")
*/

import axios from 'axios';

// Cria uma instância do Axios com configurações padrão
const api = axios.create({
    // URL base da API — todas as chamadas usam esse prefixo
    baseURL: 'http://localhost:8000/api/v1',

    // Headers padrão para todas as requisições
    headers: {
        'Content-Type': 'application/json',
    },

    // Timeout de 10 segundos (evita que a app "trave" esperando)
    timeout: 10000,
});

export default api;
