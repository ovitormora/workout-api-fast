/*
  🎓 main.tsx — PONTO DE ENTRADA da aplicação React
  
  Este é o PRIMEIRO arquivo que o navegador executa.
  Ele faz duas coisas:
  1. Importa o CSS global (nosso design system)
  2. Renderiza o componente <App /> dentro do elemento #root do HTML
  
  🎓 O QUE É ReactDOM.createRoot?
  É a função que "conecta" o React ao HTML. Ela pega o 
  elemento <div id="root"> do index.html e injeta toda 
  a aplicação React dentro dele.
  
  🎓 O QUE É <StrictMode>?
  É um wrapper que ativa verificações extras durante o 
  desenvolvimento (como detectar efeitos colaterais 
  não intencionais). Não afeta a produção.
*/

import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

// Importa nosso design system (estilos globais)
import './styles/global.css'

// Importa o componente principal da aplicação
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
