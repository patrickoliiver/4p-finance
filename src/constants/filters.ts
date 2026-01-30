import { DashboardIcon, DownloadIcon, UploadIcon, TrashIcon } from '@radix-ui/react-icons'
import type { FilterType } from '../types'

export const FILTER_OPTIONS = [
  { id: 'all' as FilterType, label: 'Todos', icon: DashboardIcon },
  { id: 'income' as FilterType, label: 'Entradas', icon: DownloadIcon },
  { id: 'outcome' as FilterType, label: 'Saídas', icon: UploadIcon },
  { id: 'deleted' as FilterType, label: 'Excluídos', icon: TrashIcon },
] as const

export const MAIN_FILTERS = FILTER_OPTIONS.slice(0, 3)
export const DELETED_FILTER = FILTER_OPTIONS[3]
