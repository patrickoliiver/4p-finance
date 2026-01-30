import type { ReactNode } from 'react'

/**
 * Cria a mensagem de exclusão com formatação especial
 */
export function createDeleteToastDescription(): ReactNode {
  return (
    <>
      Já pode visualizar na pasta de <span className="text-neutral-50 underline">excluídos</span>
    </>
  )
}
