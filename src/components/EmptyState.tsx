export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <h2 className="text-xl font-medium text-zinc-300 mb-2">
        Nenhum lançamento cadastrado
      </h2>
      <p className="text-sm text-zinc-500 text-center max-w-md">
        Caso para adicionar clique em novo valor ou se quiser resgatar um antigo clique em excluídos.
      </p>
    </div>
  )
}
