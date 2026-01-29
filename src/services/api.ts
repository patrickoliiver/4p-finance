import type { Transaction, TransactionInput, TransactionFilters, PaginationParams, PaginatedResponse } from '../types/transaction'

const API_BASE_URL = 'http://localhost:3001'

/**
 * Busca transações com filtros e paginação
 */
export async function getTransactions(
  filters?: TransactionFilters,
  pagination?: PaginationParams
): Promise<PaginatedResponse<Transaction>> {
  const params = new URLSearchParams()

  // Paginação
  if (pagination) {
    params.append('_page', pagination.page.toString())
    params.append('_limit', pagination.limit.toString())
  }

  // Ordenação (mais recentes primeiro)
  params.append('_sort', 'createdAt')
  params.append('_order', 'desc')

  // Filtros
  if (filters?.type) {
    params.append('type', filters.type)
  }

  // Soft delete
  if (filters?.onlyDeleted) {
    params.append('deletedAt_ne', 'null')
  } else if (!filters?.includeDeleted) {
    params.append('deletedAt', 'null')
  }

  const response = await fetch(`${API_BASE_URL}/transactions?${params.toString()}`)
  
  if (!response.ok) {
    throw new Error('Erro ao buscar transações')
  }

  const data: Transaction[] = await response.json()
  const total = Number.parseInt(response.headers.get('X-Total-Count') || '0', 10)

  return {
    data,
    total,
    page: pagination?.page || 1,
    limit: pagination?.limit || 10,
    totalPages: Math.ceil(total / (pagination?.limit || 10)),
  }
}

/**
 * Busca uma transação por ID
 */
export async function getTransactionById(id: string): Promise<Transaction> {
  const response = await fetch(`${API_BASE_URL}/transactions/${id}`)
  
  if (!response.ok) {
    throw new Error('Transação não encontrada')
  }

  return response.json()
}

/**
 * Cria uma nova transação
 */
export async function createTransaction(input: TransactionInput): Promise<Transaction> {
  const now = new Date().toISOString()
  
  const transaction: Omit<Transaction, 'id'> = {
    ...input,
    deletedAt: null,
    createdAt: now,
    updatedAt: now,
  }

  const response = await fetch(`${API_BASE_URL}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transaction),
  })

  if (!response.ok) {
    throw new Error('Erro ao criar transação')
  }

  return response.json()
}

/**
 * Atualiza uma transação existente
 */
export async function updateTransaction(id: string, input: Partial<TransactionInput>): Promise<Transaction> {
  const now = new Date().toISOString()
  
  const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...input,
      updatedAt: now,
    }),
  })

  if (!response.ok) {
    throw new Error('Erro ao atualizar transação')
  }

  return response.json()
}

/**
 * Soft delete - marca transação como deletada
 */
export async function softDeleteTransaction(id: string): Promise<Transaction> {
  const now = new Date().toISOString()
  
  const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      deletedAt: now,
      updatedAt: now,
    }),
  })

  if (!response.ok) {
    throw new Error('Erro ao deletar transação')
  }

  return response.json()
}

/**
 * Restaura uma transação deletada
 */
export async function restoreTransaction(id: string): Promise<Transaction> {
  const now = new Date().toISOString()
  
  const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      deletedAt: null,
      updatedAt: now,
    }),
  })

  if (!response.ok) {
    throw new Error('Erro ao restaurar transação')
  }

  return response.json()
}

/**
 * Delete permanente (hard delete) - apenas para desenvolvimento/testes
 */
export async function deleteTransaction(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Erro ao deletar transação')
  }
}
