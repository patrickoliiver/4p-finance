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
    <div className="flex justify-between mb-8">
      <div className="flex gap-3">
        {filters.slice(0, 3).map((filter) => {
          const Icon = filter.icon
          const isActive = currentFilter === filter.id

          return (
            <Button
              key={filter.id}
              onClick={() => handleFilterChange(filter.id as FilterType)}
              variant={isActive ? 'active' : 'outline'}
            >
              <Icon className="w-4 h-4" />
              {filter.label}
            </Button>
          )
        })}
      </div>
      
      <Button
        onClick={() => handleFilterChange('deleted')}
        variant={currentFilter === 'deleted' ? 'active' : 'outline'}
      >
        <TrashIcon className="w-4 h-4" />
        Excluídos
      </Button>
    </div>
  )
}
