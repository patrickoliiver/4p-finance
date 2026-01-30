import { useNavigate } from '@tanstack/react-router'
import planeyLogo from '../../assets/icones/planey.svg'
import { Button } from '../ui'

export function Header() {
  const navigate = useNavigate()

  const handleNewTransaction = () => {
    navigate({
      // @ts-expect-error - TanStack Router type issue with search params
      search: (prev: any) => ({ ...prev, modal: 'new' }),
    })
  }

  return (
    <header 
      className="flex items-center justify-between w-full max-w-[var(--width-container)] mx-auto px-4 md:px-0"
      style={{ 
        paddingTop: 'var(--header-pt)',
        paddingBottom: 'var(--header-pb)'
      }}
    >
      <img src={planeyLogo} alt="Planey" className="h-6 md:h-auto" />
      <Button onClick={handleNewTransaction} className="text-sm md:text-base">
        Novo valor
      </Button>
    </header>
  )
}
