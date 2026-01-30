import { z } from 'zod'

export const transactionSchema = z.object({
  type: z.enum(['income', 'outcome']),
  amount: z
    .number({
      message: 'O valor deve ser numérico',
    })
    .positive('O valor deve ser positivo')
    .min(0.01, 'O valor deve ser diferente de zero'),
})

export const transactionFormSchema = z.object({
  type: z.enum(['income', 'outcome']),
  amount: z
    .string()
    .min(1, 'O valor precisa ser diferente de 0.00')
    .transform((val) => {
      // Remove R$, espaços e pontos (separador de milhar BR)
      // Troca vírgula (decimal BR) por ponto
      const cleaned = val
        .replaceAll(/[R$\s.]/g, '')
        .replace(',', '.')
      return Number.parseFloat(cleaned)
    })
    .pipe(
      z
        .number()
        .positive('O valor deve ser positivo')
        .min(0.01, 'O valor precisa ser diferente de 0.00')
    ),
})

export type TransactionFormInput = z.input<typeof transactionFormSchema>
export type TransactionFormOutput = z.output<typeof transactionFormSchema>
