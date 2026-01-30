import { useNavigate, useSearch } from '@tanstack/react-router'
import { Button } from '../ui'
import { MAIN_FILTERS, DELETED_FILTER } from '../../constants/filters'
import type { FilterType } from '../../types'

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
        {MAIN_FILTERS.map((filter) => {
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
        onClick={() => handleFilterChange(DELETED_FILTER.id)}
        variant={currentFilter === DELETED_FILTER.id ? 'active' : 'outline'}
      >
        <DELETED_FILTER.icon className="w-4 h-4" />
        {DELETED_FILTER.label}
      </Button>
    </div>
  )
}
