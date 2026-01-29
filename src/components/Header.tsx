import { useNavigate } from '@tanstack/react-router'

export function Header() {
  const navigate = useNavigate()

  const handleNewTransaction = () => {
    navigate({
      search: (prev) => ({ ...prev, modal: 'new' }),
    })
  }

  return (
    <header className="px-6 py-8 flex items-center justify-between border-b border-zinc-800">
      <h1 className="text-3xl font-bold text-lime-400">Planey</h1>
      <button 
        onClick={handleNewTransaction}
        className="flex items-center gap-2 px-4 py-2 bg-lime-400 text-zinc-950 rounded-md font-medium hover:bg-lime-500 transition-colors"
      >
        Novo valor
      </button>
    </header>
  )
}
