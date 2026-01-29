import { z } from 'zod'

export const transactionSchema = z.object({
  type: z.enum(['income', 'outcome']),
  amount: z
    .number({
      invalid_type_error: 'O valor deve ser numérico',
    })
    .positive('O valor deve ser positivo')
    .min(0.01, 'O valor deve ser diferente de zero'),
})

export const transactionFormSchema = z.object({
  type: z.enum(['income', 'outcome']),
  amount: z
    .string()
    .min(1, 'Informe o valor')
    .transform((val) => {
      // Remove R$, espaços, pontos e substitui vírgula por ponto
      const cleaned = val.replaceAll(/[R$\s.]/g, '').replace(',', '.')
      return Number.parseFloat(cleaned)
    })
    .pipe(
      z
        .number()
        .positive('O valor deve ser positivo')
        .min(0.01, 'O valor deve ser diferente de zero')
    ),
})

export type TransactionFormInput = z.input<typeof transactionFormSchema>
export type TransactionFormOutput = z.output<typeof transactionFormSchema>
