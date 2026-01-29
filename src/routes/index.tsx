import { createFileRoute } from '@tanstack/react-router'
import { Header } from '../components/Header'
import { FilterTabs } from '../components/FilterTabs'
import { EmptyState } from '../components/EmptyState'
import { TransactionTable, TransactionTableSkeleton } from '../components/TransactionTable'
import { Pagination } from '../components/Pagination'
import { NewTransactionModal } from '../components/NewTransactionModal'
import { EditTransactionModal } from '../components/EditTransactionModal'
import { useTransactions, useSoftDeleteTransaction, useRestoreTransaction } from '../hooks/useTransactions'

type SearchParams = {
  filter?: 'all' | 'income' | 'outcome' | 'deleted'
  page?: number
  limit?: number
  modal?: 'new' | 'edit'
  id?: string
}

export const Route = createFileRoute('/')({
  component: HomePage,
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    return {
      filter: (search.filter as SearchParams['filter']) || 'all',
      page: Number(search.page) || 1,
      limit: Number(search.limit) || 10,
      modal: search.modal as SearchParams['modal'],
      id: search.id as string,
    }
  },
})

function HomePage() {
  const { filter, page = 1, limit = 10 } = Route.useSearch()
  const navigate = Route.useNavigate()

  // Configurar filtros baseado na tab selecionada
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

  const handleDelete = async (id: string) => {
    try {
      await softDelete.mutateAsync(id)
    } catch (error) {
      console.error('Erro ao deletar:', error)
    }
  }

  const handleRestore = async (id: string) => {
    try {
      await restore.mutateAsync(id)
    } catch (error) {
      console.error('Erro ao restaurar:', error)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 px-6 py-8 max-w-4xl mx-auto w-full">
        <FilterTabs />

        {isLoading && <TransactionTableSkeleton />}
        
        {error && (
          <div className="text-center py-12">
            <p className="text-red-400">Erro ao carregar transações</p>
          </div>
        )}
        
        {data && data.data.length === 0 && <EmptyState />}
        
        {data && data.data.length > 0 && (
          <>
            <TransactionTable
              transactions={data.data}
              onDelete={filter === 'deleted' ? undefined : handleDelete}
              onRestore={filter === 'deleted' ? handleRestore : undefined}
              showDeleted={filter === 'deleted'}
            />
            {data.totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={data.totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </main>

      <NewTransactionModal />
      <EditTransactionModal />
    </div>
  )
}
