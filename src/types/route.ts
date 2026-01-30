export type SearchParams = {
  filter?: 'all' | 'income' | 'outcome' | 'deleted'
  page?: number
  limit?: number
  modal?: 'new' | 'edit'
  id?: string
  amount?: string
  type?: 'income' | 'outcome'
}

export type FilterType = 'all' | 'income' | 'outcome' | 'deleted'
