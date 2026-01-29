import { useNavigate, useSearch } from '@tanstack/react-router'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { transactionFormSchema, type TransactionFormInput } from '../schemas/transaction'
import { maskCurrency } from '../utils/currency'
import { useCreateTransaction } from '../hooks/useTransactions'
import { useState } from 'react'

export function NewTransactionModal() {
  const navigate = useNavigate()
  const search = useSearch({ from: '/' })
  const isOpen = search.modal === 'new'
  const [isSubmitting, setIsSubmitting] = useState(false)

  const createTransaction = useCreateTransaction()

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TransactionFormInput>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      type: 'income',
      amount: '',
    },
  })

  const handleClose = () => {
    navigate({
      search: (prev) => {
        const { modal, ...rest } = prev
        return rest
      },
    })
    reset()
  }

  const onSubmit = async (data: TransactionFormInput) => {
    try {
      setIsSubmitting(true)
      const validated = transactionFormSchema.parse(data)
      
      await createTransaction.mutateAsync({
        type: validated.type,
        amount: Math.round(validated.amount * 100), // Converte para centavos
      })

      handleClose()
    } catch (error) {
      console.error('Erro ao criar transação:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] bg-zinc-900 border border-zinc-800 rounded-lg p-6 shadow-lg">
          <Dialog.Title className="text-2xl font-bold text-white mb-6">
            Novo valor
          </Dialog.Title>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Tipo */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-3">
                Tipo
              </label>
              <div className="flex gap-3">
                <label className="flex-1">
                  <input
                    type="radio"
                    value="income"
                    {...register('type')}
                    className="peer sr-only"
                  />
                  <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-md border-2 border-zinc-800 peer-checked:border-lime-400 peer-checked:bg-lime-400/10 cursor-pointer transition-all">
                    <span className="text-lime-400">↓</span>
                    <span className="font-medium">Entrada</span>
                  </div>
                </label>

                <label className="flex-1">
                  <input
                    type="radio"
                    value="outcome"
                    {...register('type')}
                    className="peer sr-only"
                  />
                  <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-md border-2 border-zinc-800 peer-checked:border-red-400 peer-checked:bg-red-400/10 cursor-pointer transition-all">
                    <span className="text-red-400">↑</span>
                    <span className="font-medium">Saída</span>
                  </div>
                </label>
              </div>
              {errors.type && (
                <p className="mt-2 text-sm text-red-400">{errors.type.message}</p>
              )}
            </div>

            {/* Valor */}
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-zinc-300 mb-2">
                Valor
              </label>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="amount"
                    placeholder="R$ 0,00"
                    onChange={(e) => {
                      const masked = maskCurrency(e.target.value)
                      field.onChange(masked)
                    }}
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-md text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-lime-400"
                  />
                )}
              />
              {errors.amount && (
                <p className="mt-2 text-sm text-red-400">{errors.amount.message}</p>
              )}
            </div>

            {/* Ações */}
            <div className="flex gap-3 pt-4">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="flex-1 px-4 py-3 bg-zinc-800 text-white rounded-md font-medium hover:bg-zinc-700 transition-colors"
                >
                  Cancelar
                </button>
              </Dialog.Close>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-3 bg-lime-400 text-zinc-950 rounded-md font-medium hover:bg-lime-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </form>

          <Dialog.Close asChild>
            <button
              className="absolute right-4 top-4 p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
              aria-label="Fechar"
            >
              <Cross2Icon className="w-5 h-5" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
