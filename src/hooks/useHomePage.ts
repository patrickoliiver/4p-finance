import { useToast } from '../components/ui'
import { useTransactions, useSoftDeleteTransaction, useRestoreTransaction } from './useTransactions'
import { EMPTY_STATE_MESSAGES } from '../constants/messages'
import { createDeleteToastDescription } from '../utils/toastHelpers'
import type { SearchParams, FilterType } from '../types/route'

type UseHomePageParams = {
  search: SearchParams
  navigate: (options: { search: (prev: SearchParams) => SearchParams; replace?: boolean }) => void
}

export function useHomePage({ search, navigate }: UseHomePageParams) {
  const { filter = 'all', page = 1, limit = 9, modal } = search
  const { addToast } = useToast()

  const filters = {
    type: filter === 'income' || filter === 'outcome' ? filter : undefined,
    onlyDeleted: filter === 'deleted',
    includeDeleted: false,
  }

  const { data, isLoading, error } = useTransactions(filters, { page, limit })
  const softDelete = useSoftDeleteTransaction()
  const restore = useRestoreTransaction()

  const handlePageChange = (newPage: number) => {
    navigate({
      search: (prev) => ({ ...prev, page: newPage }),
    })
  }

  const handleItemsPerPageChange = (newLimit: number) => {
    navigate({
      search: (prev) => ({ ...prev, limit: newLimit, page: 1 }),
    })
  }

  const handleDelete = async (id: string) => {
    try {
      await softDelete.mutateAsync(id)
      addToast({
        title: 'Valor excluído',
        description: createDeleteToastDescription(),
      })
    } catch (error) {
      console.error('Erro ao deletar:', error)
    }
  }

  const handleRestore = async (id: string) => {
    try {
      await restore.mutateAsync(id)
      addToast({
        title: 'Valor restaurado',
        description: 'Já pode visualizar na lista',
      })
    } catch (error) {
      console.error('Erro ao restaurar:', error)
    }
  }

  const getEmptyStateMessage = () => {
    return EMPTY_STATE_MESSAGES[filter as FilterType] || EMPTY_STATE_MESSAGES.all
  }

  const handleCloseModal = () => {
    navigate({
      search: (prev) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { modal: _modal, id: _id, amount: _amount, type: _type, ...rest } = prev
        return rest
      },
    })
  }

  const handleValuesChange = (amount: string, type: 'income' | 'outcome') => {
    navigate({
      search: (prev) => ({ ...prev, amount, type }),
      replace: true,
    })
  }

  return {
    filter: filter as FilterType,
    page,
    limit,
    modal,
    data,
    isLoading,
    error,
    handlePageChange,
    handleItemsPerPageChange,
    handleDelete,
    handleRestore,
    handleCloseModal,
    handleValuesChange,
    getEmptyStateMessage,
  }
}
