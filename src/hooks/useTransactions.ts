import { useMutation, useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query'
import type { TransactionFilters, PaginationParams, TransactionInput } from '../types/transaction'
import * as api from '../services/api'

const QUERY_KEYS = {
  transactions: (filters?: TransactionFilters, pagination?: PaginationParams) => 
    ['transactions', filters, pagination] as const,
  transaction: (id: string) => ['transaction', id] as const,
}

/**
 * Hook para buscar lista de transações com filtros e paginação
 */
export function useTransactions(
  filters?: TransactionFilters,
  pagination?: PaginationParams
) {
  return useQuery({
    queryKey: QUERY_KEYS.transactions(filters, pagination),
    queryFn: () => api.getTransactions(filters, pagination),
    staleTime: 1000 * 60, // 1 minuto
    placeholderData: keepPreviousData,
  })
}

/**
 * Hook para buscar uma transação específica
 */
export function useTransaction(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.transaction(id),
    queryFn: () => api.getTransactionById(id),
    enabled: !!id,
  })
}

/**
 * Hook para criar nova transação
 */
export function useCreateTransaction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: TransactionInput) => api.createTransaction(input),
    onSuccess: () => {
      // Invalida todas as queries de transações para refetch
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })
}

/**
 * Hook para atualizar transação
 */
export function useUpdateTransaction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TransactionInput> }) =>
      api.updateTransaction(id, data),
    onSuccess: (data) => {
      // Invalida todas as queries de transações
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      // Atualiza a query específica da transação
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.transaction(data.id) })
    },
  })
}

/**
 * Hook para soft delete de transação
 */
export function useSoftDeleteTransaction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => api.softDeleteTransaction(id),
    onSuccess: (data) => {
      // Invalida todas as queries de transações
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      // Atualiza a query específica da transação
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.transaction(data.id) })
    },
  })
}

/**
 * Hook para restaurar transação deletada
 */
export function useRestoreTransaction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => api.restoreTransaction(id),
    onSuccess: (data) => {
      // Invalida todas as queries de transações
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      // Atualiza a query específica da transação
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.transaction(data.id) })
    },
  })
}

/**
 * Hook para delete permanente (hard delete)
 */
export function useDeleteTransaction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => api.deleteTransaction(id),
    onSuccess: () => {
      // Invalida todas as queries de transações
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })
}
