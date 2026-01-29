import { useNavigate, useSearch } from '@tanstack/react-router'
import { DashboardIcon, DownloadIcon, UploadIcon, TrashIcon } from '@radix-ui/react-icons'

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
    <div className="flex gap-4 mb-12">
      {filters.map((filter) => {
        const Icon = filter.icon
        const isActive = currentFilter === filter.id

        return (
          <button
            key={filter.id}
            onClick={() => handleFilterChange(filter.id as FilterType)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
              isActive
                ? 'bg-zinc-800 text-white'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Icon className="w-4 h-4" />
            {filter.label}
          </button>
        )
      })}
    </div>
  )
}
