import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { Button } from './ui/button'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  itemsPerPage?: number
  onItemsPerPageChange?: (limit: number) => void
}

const ITEMS_PER_PAGE_OPTIONS = [5, 9, 15, 30]

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 9,
  onItemsPerPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  // Mostra no máximo 5 páginas ao redor da atual
  const visiblePages = pages.filter((page) => {
    if (totalPages <= 5) return true
    if (page === 1 || page === totalPages) return true
    return Math.abs(page - currentPage) <= 1
  })

  return (
    <div className="flex items-center justify-between mt-8">
      {/* Seletor de itens por página */}
      {onItemsPerPageChange && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-500">Itens:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="bg-[var(--color-ui-inactive-bg)] border border-[var(--color-ui-inactive-border)] rounded-lg px-2 py-1 text-sm text-neutral-50 outline-none cursor-pointer"
          >
            {ITEMS_PER_PAGE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Navegação de páginas */}
      <div className="flex items-center gap-2">
        <Button
          variant="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Página anterior"
        >
          <ChevronLeftIcon className="w-4 h-4 text-white" />
        </Button>

        {visiblePages.map((page, index) => {
          const prevPage = visiblePages[index - 1]
          const showEllipsis = prevPage && page - prevPage > 1
          const isActive = currentPage === page

          return (
            <div key={page} className="flex items-center gap-2">
              {showEllipsis && (
                <span className="px-2 text-zinc-500">...</span>
              )}
              <Button
                variant="icon-number"
                onClick={() => onPageChange(page)}
                style={isActive ? { color: 'var(--color-brand-main)' } : undefined}
              >
                {page}
              </Button>
            </div>
          )
        })}

        <Button
          variant="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Próxima página"
        >
          <ChevronRightIcon className="w-4 h-4 text-white" />
        </Button>
      </div>
    </div>
  )
}
