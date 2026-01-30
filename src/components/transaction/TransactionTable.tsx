import { useNavigate } from '@tanstack/react-router'
import { TrashIcon, DownloadIcon, UploadIcon } from '@radix-ui/react-icons'
import type { Transaction } from '../../types/transaction'
import { formatCurrency } from '../../utils/currency'
import { Button } from '../ui'

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
      // @ts-expect-error - TanStack Router type issue with search params
      search: (prev: any) => ({ ...prev, modal: 'edit', id }),
    })
  }

  return (
    <div className="w-full border overflow-hidden mx-4 md:mx-0 max-w-[var(--width-container)] rounded-[var(--radius-card)] bg-[var(--color-ui-inactive-bg)] border-[var(--color-ui-inactive-border)]">
      {transactions.map((transaction, index) => (
        <div
          key={transaction.id}
          onClick={() => handleRowClick(transaction.id)}
          className={`w-full flex items-center justify-between hover:bg-zinc-800 transition-colors cursor-pointer px-4 md:px-6 py-3 md:py-4 min-h-16 bg-[var(--color-ui-inactive-bg)] ${
            index < transactions.length - 1 ? 'border-b border-[var(--color-ui-inactive-border)]' : ''
          }`}
        >
            <div className="flex items-center gap-4">
              <span
                className={`flex items-center gap-2 font-normal text-sm md:text-base leading-none ${
                  transaction.type === 'income' ? 'text-[var(--color-positive-50)]' : 'text-[var(--color-alert-50)]'
                }`}
              >
                {transaction.type === 'income' ? (
                  <DownloadIcon className="w-4 h-4 text-[var(--color-positive-50)]" />
                ) : (
                  <UploadIcon className="w-4 h-4 text-[var(--color-alert-50)]" />
                )}
                {formatCurrency(transaction.amount)}
              </span>
            </div>

            {showDeleted ? (
              <Button
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation()
                  if (onRestore) {
                    onRestore(transaction.id)
                  }
                }}
                className="h-8 px-3 md:px-4 text-xs md:text-sm"
              >
                Restaurar
              </Button>
            ) : (
              <Button
                variant="icon-destructive"
                onClick={(e) => {
                  e.stopPropagation()
                  if (onDelete) {
                    onDelete(transaction.id)
                  }
                }}
                title="Excluir"
                className="!w-8 !h-8 !p-2"
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            )}
          </div>
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
