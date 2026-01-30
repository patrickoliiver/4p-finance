import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos - dados frescos
      gcTime: 1000 * 60 * 30, // 30 minutos - mantém cache inativo
      refetchOnWindowFocus: false,
      retry: 1, // Apenas 1 retry em caso de erro
    },
  },
})
