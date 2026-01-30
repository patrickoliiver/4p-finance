import { useNavigate } from '@tanstack/react-router'

/**
 * Hook para navegação de modais via query params
 */
export function useNavigateModal() {
  const navigate = useNavigate()

  const openNewModal = () => {
    navigate({
      // @ts-expect-error - TanStack Router type issue with search params
      search: (prev) => ({ ...prev, modal: 'new' }),
    })
  }

  const openEditModal = (id: string) => {
    navigate({
      // @ts-expect-error - TanStack Router type issue with search params
      search: (prev) => ({ ...prev, modal: 'edit', id }),
    })
  }

  const closeModal = () => {
    navigate({
      // @ts-expect-error - TanStack Router type issue with search params
      search: (prev) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { modal: _modal, id: _id, amount: _amount, type: _type, ...rest } = prev
        return rest
      },
    })
  }

  return {
    openNewModal,
    openEditModal,
    closeModal,
  }
}
