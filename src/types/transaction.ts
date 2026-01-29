export type Transaction = {
  id: string
  type: 'income' | 'outcome'
  amount: number
  deletedAt: string | null
  createdAt: string
  updatedAt: string
}

export type TransactionInput = Omit<Transaction, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>

export type TransactionFilters = {
  type?: 'income' | 'outcome'
  includeDeleted?: boolean
  onlyDeleted?: boolean
}

export type PaginationParams = {
  page: number
  limit: number
}

export type PaginatedResponse<T> = {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}
