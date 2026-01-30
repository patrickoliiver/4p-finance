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
    <div 
      className="w-full border overflow-hidden"
      style={{
        maxWidth: 'var(--width-container)',
        borderRadius: 'var(--radius-card)',
        backgroundColor: 'var(--color-ui-inactive-bg)',
        borderColor: 'var(--color-ui-inactive-border)',
        borderWidth: '1px'
      }}
    >
      {transactions.map((transaction, index) => (
        <div
          key={transaction.id}
          onClick={() => handleRowClick(transaction.id)}
          className="w-full flex items-center justify-between hover:bg-zinc-800 transition-colors cursor-pointer"
          style={{
            height: '64px',
            paddingTop: '16px',
            paddingRight: '24px',
            paddingBottom: '16px',
            paddingLeft: '24px',
            borderBottom: index < transactions.length - 1 ? '1px solid var(--color-ui-inactive-border)' : 'none',
            backgroundColor: 'var(--color-ui-inactive-bg)'
          }}
        >
            <div className="flex items-center gap-4">
              <span
                className="flex items-center gap-2 font-normal"
                style={{
                  fontSize: '16px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  color: transaction.type === 'income' ? 'var(--color-positive-50)' : 'var(--color-alert-50)'
                }}
              >
                {transaction.type === 'income' ? (
                  <DownloadIcon className="w-4 h-4" style={{ color: 'var(--color-positive-50)' }} />
                ) : (
                  <UploadIcon className="w-4 h-4" style={{ color: 'var(--color-alert-50)' }} />
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
                style={{
                  width: 'auto',
                  height: '32px',
                  padding: '8px 14px'
                }}
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
