import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'brand' | 'outline' | 'active' | 'icon-destructive' | 'icon' | 'icon-number'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export function Button({ 
  children, 
  variant = 'brand', 
  size = 'default',
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = 'flex items-center justify-center gap-2 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed border'
  
  const variants = {
    brand: 'bg-[var(--color-brand-main)] border-[var(--color-brand-border)] text-[var(--color-text-dark)] rounded-[var(--radius-pill)] h-[var(--size-button-h)] px-[var(--spacing-button-x)] py-[var(--spacing-button-y)]',
    outline: 'bg-[var(--color-ui-inactive-bg)] border-[var(--color-ui-inactive-border)] text-[var(--color-ui-inactive-text)] rounded-[var(--radius-pill)] h-[var(--size-button-h)] px-[var(--spacing-button-x)] py-[var(--spacing-button-y)] hover:bg-[var(--color-ui-inactive-bg)] active:bg-[var(--color-ui-active)] active:border-[var(--color-brand-border)] active:text-[var(--color-brand-main)]',
    active: 'bg-[var(--color-ui-active)] border-[var(--color-brand-border)] text-[var(--color-brand-main)] rounded-[var(--radius-pill)] h-[var(--size-button-h)] px-[var(--spacing-button-x)] py-[var(--spacing-button-y)]',
    'icon-destructive': 'bg-[var(--color-destructive-main)] border-[var(--color-destructive-main)] text-[var(--color-alert-50)] rounded-[var(--radius-icon)] w-[var(--size-button-icon)] h-[var(--size-button-icon)] p-2',
    icon: 'bg-[var(--color-ui-inactive-bg)] border-transparent text-[var(--color-ui-inactive-text)] rounded-[var(--radius-icon)] w-[var(--size-button-icon)] h-[var(--size-button-icon)] p-2',
    'icon-number': 'bg-[var(--color-ui-inactive-bg)] border-transparent text-[var(--color-ui-inactive-text)] rounded-[var(--radius-icon)] w-[var(--size-button-icon)] h-[var(--size-button-icon)] p-2 text-sm'
  }
  
  const sizeClasses = {
    default: '',
    sm: 'text-xs',
    lg: 'text-base',
    icon: 'w-[var(--size-button-icon)] h-[var(--size-button-icon)] p-2'
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
