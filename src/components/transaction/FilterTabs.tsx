import { useNavigate, useSearch } from '@tanstack/react-router'
import { DashboardIcon, DownloadIcon, UploadIcon, TrashIcon } from '@radix-ui/react-icons'
import { Button } from '../ui'

type FilterType = 'all' | 'income' | 'outcome' | 'deleted'

const filters = [
  { id: 'all', label: 'Todos', icon: DashboardIcon },
  { id: 'income', label: 'Entradas', icon: DownloadIcon },
  { id: 'outcome', label: 'Saídas', icon: UploadIcon },
  { id: 'deleted', label: 'Excluídos', icon: TrashIcon },
] as const

export function FilterTabs() {
  const navigate = useNavigate()
  const search = useSearch({ from: '/' })
  const currentFilter = search.filter || 'all'

  const handleFilterChange = (filter: FilterType) => {
    navigate({
      to: '/',
      search: { filter },
    })
  }

  return (
    <div className="flex items-center justify-between gap-2 mb-8 px-4 md:px-0 overflow-x-auto">
      <div className="flex gap-2 flex-shrink-0">
        {filters.slice(0, 3).map((filter) => {
          const Icon = filter.icon
          const isActive = currentFilter === filter.id

          return (
            <Button
              key={filter.id}
              onClick={() => handleFilterChange(filter.id as FilterType)}
              variant={isActive ? 'active' : 'outline'}
              className="flex-shrink-0 !h-8 !px-3 text-xs md:text-sm"
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{filter.label}</span>
            </Button>
          )
        })}
      </div>
      
      <Button
        onClick={() => handleFilterChange('deleted')}
        variant={currentFilter === 'deleted' ? 'active' : 'outline'}
        className="flex-shrink-0 !h-8 !px-3 text-xs md:text-sm"
      >
        <TrashIcon className="w-4 h-4" />
        <span className="hidden sm:inline">Excluídos</span>
      </Button>
    </div>
  )
}
