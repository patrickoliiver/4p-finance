import { createFileRoute } from '@tanstack/react-router'
import { Header } from '../components/Header'
import { FilterTabs } from '../components/FilterTabs'
import { EmptyState } from '../components/EmptyState'
import { TransactionTable, TransactionTableSkeleton } from '../components/transaction/TransactionTable'
import { Pagination } from '../components/Pagination'
import { TransactionModal } from '../components/transaction/TransactionModal'
import { useTransactions, useSoftDeleteTransaction, useRestoreTransaction } from '../hooks/useTransactions'
import { useToast } from '../components/ui/toast'

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
      limit: Number(search.limit) || 9,
      modal: search.modal as SearchParams['modal'],
      id: search.id as string,
    }
  },
})

function HomePage() {
  const search = Route.useSearch()
  const { filter, page = 1, limit = 9, modal } = search
  const navigate = Route.useNavigate()
  const { addToast } = useToast()

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
      addToast({
        title: 'Valor excluído',
        description: 'Já pode visualizar na pasta de excluídos',
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

  const handleCloseModal = () => {
    navigate({
      search: (prev) => {
        const { modal, ...rest } = prev
        return rest
      },
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-[var(--width-container)] mx-auto w-full">
        <FilterTabs />

        {isLoading && !data && <TransactionTableSkeleton />}
        
        {error && (
          <div className="text-center">
            <p className="text-red-400">Erro ao carregar transações</p>
          </div>
        )}
        
        {data && data.data.length === 0 && (
          <EmptyState 
            title={filter === 'deleted' ? 'Nenhum lançamento excluído' : 'Nenhum lançamento cadastrado'}
            description={filter === 'deleted' 
              ? 'Todos os seus lançamentos estão ativos.' 
              : 'Caso para adicionar clique em novo valor ou se quiser resgatar um antigo clique em excluídos.'
            }
          />
        )}
        
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

      <TransactionModal
        open={modal === 'new'}
        onClose={handleCloseModal}
        mode="new"
      />

      <TransactionModal
        open={modal === 'edit'}
        onClose={handleCloseModal}
        mode="edit"
        transactionId={search.id}
      />
    </div>
  )
}
