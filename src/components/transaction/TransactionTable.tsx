import { useNavigate } from '@tanstack/react-router'
import { TrashIcon, DownloadIcon, UploadIcon } from '@radix-ui/react-icons'
import type { Transaction } from '../../types/transaction'
import { formatCurrency } from '../../utils/currency'

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

            <button
              onClick={(e) => {
                e.stopPropagation()
                if (!showDeleted && onDelete) {
                  onDelete(transaction.id)
                } else if (showDeleted && onRestore) {
                  onRestore(transaction.id)
                }
              }}
              className="transition-opacity hover:opacity-80"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-icon)',
                padding: '8px',
                gap: '8px',
                backgroundColor: 'var(--color-alert-100)',
                border: '1px solid var(--color-alert-100)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title={showDeleted ? "Restaurar" : "Excluir"}
            >
              {showDeleted ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-alert-50)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                  <path d="M3 21v-5h5" />
                </svg>
              ) : (
                <TrashIcon className="w-4 h-4" style={{ color: 'var(--color-alert-50)' }} />
              )}
            </button>
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
