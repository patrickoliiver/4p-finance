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
}

export function TransactionModal({ open, onClose, mode, transactionId }: TransactionModalProps) {
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

  // Preenche o formulário quando estiver editando
  useEffect(() => {
    if (mode === 'edit' && transaction) {
      setValue('type', transaction.type)
      // Converte centavos para reais e formata
      const amountInReais = transaction.amount / 100
      setValue('amount', formatCurrency(amountInReais))
    } else if (mode === 'new') {
      reset({
        type: 'income',
        amount: '',
      })
    }
  }, [mode, transaction, setValue, reset])

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
          ? '✅ Entrada atualizada'
          : '✅ Saída atualizada'

        addToast({
          title: toastTitle,
          description: 'As alterações foram salvas com sucesso',
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
    ? 'Quanto você quer editar?' 
    : 'Quanto você quer adicionar?'

  const submitLabel = mode === 'edit'
    ? (isSubmitting ? 'Salvando...' : 'Salvar')
    : (isSubmitting ? 'Adicionando...' : 'Adicionar')

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => !open && handleClose()}
      title={title}
      description="Formulário para adicionar ou editar transações"
    >
      <style>
        {`
          .transaction-amount-input::placeholder {
            color: #FAFAFA !important;
            opacity: 1 !important;
          }
          .transaction-amount-input::-webkit-input-placeholder {
            color: #FAFAFA !important;
            opacity: 1 !important;
          }
          .transaction-amount-input::-moz-placeholder {
            color: #FAFAFA !important;
            opacity: 1 !important;
          }
          .transaction-amount-input:-ms-input-placeholder {
            color: #FAFAFA !important;
            opacity: 1 !important;
          }
        `}
      </style>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Valor Display */}
        <div
          style={{
            fontSize: '24px',
            fontWeight: 400,
            lineHeight: '100%',
            letterSpacing: '0%',
            color: '#FAFAFA',
            marginBottom: '24px',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="0.00"
                className="transaction-amount-input"
                onChange={(e) => {
                  const masked = maskCurrency(e.target.value)
                  field.onChange(masked)
                }}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '24px',
                  fontWeight: 400,
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  color: '#FAFAFA',
                  fontFamily: 'Inter, sans-serif',
                }}
              />
            )}
          />
          {errors.amount && (
            <p
              style={{
                fontSize: '12px',
                color: '#DB2777',
                marginTop: '8px',
              }}
            >
              {errors.amount.message}
            </p>
          )}
        </div>

        {/* Botões Entrada/Saída e Adicionar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
          {/* Container dos botões Entrada/Saída */}
          <div
            style={{
              width: '162px',
              height: '40px',
              borderRadius: '200px',
              paddingTop: '8px',
              paddingBottom: '8px',
              paddingLeft: '7px',
              paddingRight: '7px',
              display: 'flex',
              gap: '10px',
              backgroundColor: '#262626',
            }}
          >
            <button
              type="button"
              onClick={() => setValue('type', 'income')}
              style={{
                width: '77px',
                height: '24px',
                borderRadius: '200px',
                border: 'none',
                backgroundColor: selectedType === 'income' ? '#404040' : 'transparent',
                color: '#FAFAFA',
                fontSize: '14px',
                fontWeight: 400,
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2px 12px',
              }}
            >
              Entrada
            </button>

            <button
              type="button"
              onClick={() => setValue('type', 'outcome')}
              style={{
                width: '77px',
                height: '24px',
                borderRadius: '200px',
                border: 'none',
                backgroundColor: selectedType === 'outcome' ? '#404040' : 'transparent',
                color: '#FAFAFA',
                fontSize: '14px',
                fontWeight: 400,
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2px 12px',
              }}
            >
              Saída
            </button>
          </div>

          {/* Botão Adicionar */}
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            style={{ width: '92px', height: '32px' }}
          >
            {submitLabel}
          </Button>
        </div>
      </form>
    </Dialog>
  )
}
