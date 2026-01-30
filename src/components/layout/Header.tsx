import planeyLogo from '../../assets/icones/planey.svg'
import { Button } from '../ui'
import { useNavigateModal } from '../../hooks/useNavigateModal'

export function Header() {
  const { openNewModal } = useNavigateModal()

  return (
    <header 
      className="flex items-center justify-between w-full max-w-[var(--width-container)] mx-auto"
      style={{ 
        paddingTop: 'var(--header-pt)',
        paddingBottom: 'var(--header-pb)'
      }}
    >
      <img src={planeyLogo} alt="Planey" />
      <Button onClick={openNewModal}>
        Novo valor
      </Button>
    </header>
  )
}
