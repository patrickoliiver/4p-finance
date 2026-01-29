/**
 * Formata valor numérico para moeda brasileira (R$)
 * @param value - Valor em centavos ou reais
 * @returns String formatada (ex: "R$ 1.234,56")
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value / 100)
}

/**
 * Remove formatação de moeda e retorna número
 * @param value - String formatada (ex: "R$ 1.234,56")
 * @returns Número em centavos
 */
export function parseCurrency(value: string): number {
  const cleaned = value.replaceAll(/[R$\s.]/g, '').replace(',', '.')
  return Math.round(Number.parseFloat(cleaned || '0') * 100)
}

/**
 * Aplica máscara de moeda brasileira em tempo real
 * @param value - Valor a ser formatado
 * @returns String formatada para input
 */
export function maskCurrency(value: string): string {
  // Remove tudo que não é dígito
  const numbers = value.replaceAll(/\D/g, '')
  
  // Se vazio, retorna vazio
  if (!numbers) return ''
  
  // Converte para número e formata
  const amount = Number.parseInt(numbers, 10)
  
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount / 100)
}

/**
 * Formata valor para exibição sem símbolo R$
 * @param value - Valor em centavos
 * @returns String formatada sem símbolo
 */
export function formatAmount(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100)
}
