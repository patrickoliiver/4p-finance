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
