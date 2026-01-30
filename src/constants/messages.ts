import type { FilterType } from '../types'

/**
 * Mensagens de Empty State baseadas no filtro ativo
 */
export const EMPTY_STATE_MESSAGES: Record<FilterType, { title: string; description: string }> = {
  all: {
    title: 'Nenhum lançamento cadastrado',
    description: 'Caso para adicionar clique em novo valor ou se quiser resgatar um antigo clique em excluídos.',
  },
  income: {
    title: 'Nenhuma entrada cadastrada',
    description: 'Clique em novo valor para adicionar sua primeira entrada.',
  },
  outcome: {
    title: 'Nenhuma saída cadastrada',
    description: 'Clique em novo valor para adicionar sua primeira saída.',
  },
  deleted: {
    title: 'Nenhum lançamento excluído',
    description: 'Todos os seus lançamentos estão ativos.',
  },
}

/**
 * Mensagens de toast para transações
 */
export const TOAST_MESSAGES = {
  create: {
    income: {
      title: '🎉 Valor de entrada adicionado',
      description: 'Já pode visualizar na lista',
    },
    outcome: {
      title: '🎉 Valor de saída adicionado',
      description: 'Já pode visualizar na lista',
    },
  },
  update: {
    income: {
      title: '🎉 Valor de entrada atualizado',
      description: 'Já pode visualizar na lista',
    },
    outcome: {
      title: '🎉 Valor de saída atualizado',
      description: 'Já pode visualizar na lista',
    },
  },
  delete: {
    title: 'Valor excluído',
  },
  restore: {
    title: 'Valor restaurado',
    description: 'Já pode visualizar na lista',
  },
  error: {
    title: '❌ Erro ao salvar',
    description: 'Ocorreu um erro ao salvar a transação',
  },
}
