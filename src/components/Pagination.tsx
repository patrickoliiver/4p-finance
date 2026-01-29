import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { Button } from './ui/button'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  // Mostra no máximo 5 páginas ao redor da atual
  const visiblePages = pages.filter((page) => {
    if (totalPages <= 5) return true
    if (page === 1 || page === totalPages) return true
    return Math.abs(page - currentPage) <= 1
  })

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
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
  )
}
