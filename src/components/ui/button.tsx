import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'default',
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = 'flex items-center justify-center gap-2 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'border',
    secondary: '',
    outline: 'border',
    ghost: 'border-transparent'
  }
  
  const sizes = {
    default: '',
    sm: 'text-xs',
    lg: 'text-base'
  }

  const getVariantStyles = () => {
    const styles: React.CSSProperties = {
      borderRadius: 'var(--radius-pill)',
      height: 'var(--size-button-h)',
      paddingLeft: 'var(--spacing-button-x)',
      paddingRight: 'var(--spacing-button-x)',
      paddingTop: 'var(--spacing-button-y)',
      paddingBottom: 'var(--spacing-button-y)',
      fontSize: 'var(--text-button)',
    }

    if (variant === 'primary') {
      styles.backgroundColor = 'var(--color-brand-main)'
      styles.borderColor = 'var(--color-brand-border)'
      styles.color = 'var(--color-background)'
      styles.borderWidth = '1px'
    } else if (variant === 'secondary') {
      styles.backgroundColor = 'var(--color-ui-active)'
      styles.color = 'var(--color-brand-main)'
    } else if (variant === 'outline') {
      styles.backgroundColor = 'transparent'
      styles.borderColor = 'var(--color-brand-border)'
      styles.color = 'var(--color-brand-main)'
      styles.borderWidth = '1px'
    } else if (variant === 'ghost') {
      styles.backgroundColor = 'transparent'
      styles.color = 'var(--color-brand-main)'
    }

    return styles
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      style={getVariantStyles()}
      {...props}
    >
      {children}
    </button>
  )
}
