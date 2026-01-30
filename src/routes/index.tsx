import { createFileRoute } from '@tanstack/react-router'
import { Header } from '../components/layout'
import { EmptyState, Pagination } from '../components/shared'
import { FilterTabs, TransactionTable, TransactionTableSkeleton, TransactionModal } from '../components/transaction'
import { useHomePage } from '../hooks/useHomePage'
import type { SearchParams } from '../types/route'

export const Route = createFileRoute('/')({
  component: HomePage,
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    return {
      filter: (search.filter as SearchParams['filter']) || 'all',
      page: Number(search.page) || 1,
      limit: Number(search.limit) || 9,
      modal: search.modal as SearchParams['modal'],
      id: search.id as string,
      amount: search.amount as string,
      type: search.type as SearchParams['type'],
    }
  },
})

function HomePage() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()

  const {
    filter,
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
  } = useHomePage({ search, navigate })

  const emptyStateMessage = getEmptyStateMessage()

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
            title={emptyStateMessage.title}
            description={emptyStateMessage.description}
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
            <Pagination
              currentPage={page}
              totalPages={data.totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={limit}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </>
        )}
      </main>

      <TransactionModal
        open={modal === 'new'}
        onClose={handleCloseModal}
        mode="new"
        initialAmount={search.amount}
        initialType={search.type}
        onValuesChange={handleValuesChange}
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
