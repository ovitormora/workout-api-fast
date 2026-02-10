/*
  🎓 App.tsx — COMPONENTE PRINCIPAL da aplicação
  
  Este é o "coração" do frontend. Por enquanto é simples,
  mas nas próximas fases vamos adicionar:
  - React Router (navegação entre páginas)
  - Layout com sidebar
  - Páginas de cada entidade
  
  🎓 O QUE É UM COMPONENTE React?
  É uma função que retorna JSX (HTML dentro do JavaScript).
  Componentes são os "blocos de construção" da interface.
  Cada botão, card, página = um componente.
*/

function App() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <h1 style={{
        color: 'var(--color-primary)',
        fontSize: 'var(--font-size-3xl)'
      }}>
        💪 My Workout API
      </h1>
      <p style={{ color: 'var(--color-text-secondary)' }}>
        Frontend em construção — Fase 1 concluída!
      </p>
    </div>
  )
}

export default App
