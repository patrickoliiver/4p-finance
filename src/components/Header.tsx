import { useNavigate } from '@tanstack/react-router'
import planeyLogo from '../assets/icones/planey.svg'
import { Button } from './ui/button'

export function Header() {
  const navigate = useNavigate()

  const handleNewTransaction = () => {
    navigate({
      search: (prev) => ({ ...prev, modal: 'new' }),
    })
  }

  return (
    <header 
      className="flex items-center justify-between w-full max-w-[var(--width-container)] mx-auto"
      style={{ 
        paddingTop: 'var(--header-pt)',
        paddingBottom: 'var(--header-pb)'
      }}
    >
      <img src={planeyLogo} alt="Planey" />
      <Button onClick={handleNewTransaction}>
        Novo valor
      </Button>
    </header>
  )
}
