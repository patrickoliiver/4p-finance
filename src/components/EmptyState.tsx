export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-3">
      <p className="text-base font-light text-neutral-50 text-center leading-normal">
        Nenhum lançamento cadastrado
      </p>
      <p className="text-sm font-normal text-neutral-500 text-center leading-normal">
        Caso para adicionar clique em novo valor ou se quiser resgatar um antigo clique em excluídos.
      </p>
    </div>
  )
}
