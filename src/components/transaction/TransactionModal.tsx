import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { transactionFormSchema, type TransactionFormInput, type TransactionFormOutput } from '../../schemas/transaction'
import { maskCurrency, formatCurrency } from '../../utils/currency'
import { Dialog } from '../ui/dialog'
import { Button } from '../ui/button'
import { useCreateTransaction, useUpdateTransaction, useTransaction } from '../../hooks/useTransactions'
import { useToast } from '../ui/toast'
import { useState, useEffect } from 'react'

type TransactionModalProps = {
  open: boolean
  onClose: () => void
  mode: 'new' | 'edit'
  transactionId?: string
  initialAmount?: string
  initialType?: 'income' | 'outcome'
  onValuesChange?: (amount: string, type: 'income' | 'outcome') => void
}

export function TransactionModal({
  open,
  onClose,
  mode,
  transactionId,
  initialAmount,
  initialType,
  onValuesChange,
}: TransactionModalProps) {
  const { addToast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const createTransaction = useCreateTransaction()
  const updateTransaction = useUpdateTransaction()
  
  // Busca os dados da transação se estiver em modo de edição
  const { data: transaction } = useTransaction(transactionId || '')

  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TransactionFormInput, unknown, TransactionFormOutput>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      type: 'income',
      amount: '',
    },
  })

  const selectedType = watch('type')

  // Preenche o formulário quando estiver editando ou com valores iniciais da URL
  useEffect(() => {
    if (mode === 'edit' && transaction) {
      setValue('type', transaction.type)
      // Converte centavos para o formato do input (ex: "R$ 123,45")
      const amountInReais = transaction.amount / 100
      setValue('amount', maskCurrency(amountInReais.toFixed(2).replace('.', '')))
    } else if (mode === 'new') {
      // Usa valores da URL se existirem
      reset({
        type: initialType || 'income',
        amount: initialAmount || '',
      })
    }
  }, [mode, transaction, setValue, reset, initialAmount, initialType])

  const handleClose = () => {
    reset()
    onClose()
  }

  const onSubmit = async (data: TransactionFormOutput) => {
    try {
      setIsSubmitting(true)
      // O zodResolver já valida e transforma os dados automaticamente
      // data.amount já é um número aqui devido ao transform do schema
      
      if (mode === 'edit' && transactionId) {
        await updateTransaction.mutateAsync({
          id: transactionId,
          data: {
            type: data.type,
            amount: Math.round(data.amount * 100),
          },
        })

        const toastTitle = data.type === 'income' 
          ? '🎉 Valor de entrada atualizado'
          : '🎉 Valor de saída atualizado'

        addToast({
          title: toastTitle,
          description: 'Já pode visualizar na lista',
        })
      } else {
        await createTransaction.mutateAsync({
          type: data.type,
          amount: Math.round(data.amount * 100),
        })

        const toastTitle = data.type === 'income' 
          ? '🎉 Valor de entrada adicionado'
          : '🎉 Valor de saída adicionado'

        addToast({
          title: toastTitle,
          description: 'Já pode visualizar na lista',
        })
      }

      handleClose()
    } catch (error) {
      console.error('Erro ao salvar transação:', error)
      addToast({
        title: '❌ Erro ao salvar',
        description: 'Ocorreu um erro ao salvar a transação',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const title = mode === 'edit' 
    ? 'Valor' 
    : 'Quanto você quer adicionar?'

  const submitLabel = mode === 'edit'
    ? (isSubmitting ? 'Salvando...' : 'Salvar alterações')
    : (isSubmitting ? 'Adicionando...' : 'Adicionar')

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => !open && handleClose()}
      title={title}
      description="Formulário para adicionar ou editar transações"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Valor Display */}
        <div className="relative mb-6 text-2xl font-normal leading-none text-neutral-50 font-sans">
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="0.00"
                className={`w-full bg-transparent border-none outline-none text-2xl font-normal leading-none font-sans ${
                  errors.amount 
                    ? 'text-[#DB2777] placeholder:text-[#DB2777]' 
                    : 'text-neutral-50 placeholder:text-neutral-50'
                }`}
                onChange={(e) => {
                  const masked = maskCurrency(e.target.value)
                  field.onChange(masked)
                  if (mode === 'new' && onValuesChange) {
                    onValuesChange(masked, selectedType)
                  }
                }}
              />
            )}
          />
          {errors.amount && (
            <p className="absolute -bottom-5 left-0 text-xs text-[#DB2777]">
              {errors.amount.message}
            </p>
          )}
        </div>

        {/* Botões Entrada/Saída e Adicionar */}
        <div className="flex justify-between gap-[10px]">
          {/* Container dos botões Entrada/Saída */}
          <div className="w-[162px] h-10 rounded-full flex gap-[10px] bg-[#262626] p-[7px]">
            <button
              type="button"
              onClick={() => {
                setValue('type', 'income')
                if (mode === 'new' && onValuesChange) {
                  onValuesChange(watch('amount'), 'income')
                }
              }}
              className={`w-[77px] h-6 rounded-full border-none text-sm font-normal font-sans cursor-pointer flex items-center justify-center px-3 transition-colors ${
                selectedType === 'income' ? "bg-[#404040] text-neutral-50" : "bg-transparent text-neutral-50"
              }`}
            >
              Entrada
            </button>

            <button
              type="button"
              onClick={() => {
                setValue('type', 'outcome')
                if (mode === 'new' && onValuesChange) {
                  onValuesChange(watch('amount'), 'outcome')
                }
              }}
              className={`w-[77px] h-6 rounded-full border-none text-sm font-normal font-sans cursor-pointer flex items-center justify-center px-3 transition-colors ${
                selectedType === 'outcome' ? "bg-[#404040] text-neutral-50" : "bg-transparent text-neutral-50"
              }`}
            >
              Saída
            </button>
          </div>

          {/* Botão Submit */}
          <Button
            type="submit"
            variant="brand"
            disabled={isSubmitting}
            className={mode === 'edit' ? 'w-[144px] h-8' : 'w-[92px] h-8'}
          >
            {submitLabel}
          </Button>
        </div>
      </form>
    </Dialog>
  )
}
