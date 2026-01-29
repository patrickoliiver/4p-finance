import { useNavigate } from '@tanstack/react-router'
import { TrashIcon } from '@radix-ui/react-icons'
import type { Transaction } from '../../types/transaction'
import { formatCurrency } from '../../utils/currency'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Button } from '../ui/button'

type TransactionTableProps = {
  transactions: Transaction[]
  onDelete?: (id: string) => void
  onRestore?: (id: string) => void
  showDeleted?: boolean
}

export function TransactionTable({ 
  transactions, 
  onDelete,
  onRestore,
  showDeleted = false 
}: TransactionTableProps) {
  const navigate = useNavigate()

  const handleRowClick = (id: string) => {
    navigate({
      search: (prev) => ({ ...prev, modal: 'edit', id }),
    })
  }

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    if (onDelete) {
      onDelete(id)
    }
  }

  const handleRestoreClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    if (onRestore) {
      onRestore(id)
    }
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <button
          key={transaction.id}
          onClick={() => handleRowClick(transaction.id)}
          className="w-full flex items-center justify-between px-6 py-4 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition-colors text-left"
        >
          <div className="flex items-center gap-4">
            <span
              className={`text-lg font-medium ${
                transaction.type === 'income' ? 'text-lime-400' : 'text-red-400'
              }`}
            >
              {transaction.type === 'income' ? '↓' : '↑'} {formatCurrency(transaction.amount)}
            </span>
            <span className="text-sm text-zinc-500">
              {format(new Date(transaction.createdAt), "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}
            </span>
          </div>

          <div className="flex flex-col items-start gap-5">
            {showDeleted && onRestore ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => handleRestoreClick(e, transaction.id)}
                title="Restaurar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                  <path d="M3 21v-5h5" />
                </svg>
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => handleDeleteClick(e, transaction.id)}
                title="Excluir"
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            )}
          </div>
        </button>
      ))}
    </div>
  )
}

export function TransactionTableSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="w-full flex items-center justify-between px-6 py-4 bg-zinc-900 border border-zinc-800 rounded-lg animate-pulse"
        >
          <div className="flex items-center gap-4">
            <div className="h-6 w-32 bg-zinc-800 rounded" />
            <div className="h-4 w-48 bg-zinc-800 rounded" />
          </div>
          <div className="h-8 w-8 bg-zinc-800 rounded" />
        </div>
      ))}
    </div>
  )
}
