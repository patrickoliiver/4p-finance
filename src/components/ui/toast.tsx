import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'

interface Toast {
  id: string
  title: string
  description?: string
  duration?: number
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2)
    const newToast = { ...toast, id }
    
    setToasts((prev) => [...prev, newToast])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      <ToastPrimitive.Provider swipeDirection="right">
        {children}
        {toasts.map((toast) => (
          <ToastPrimitive.Root
            key={toast.id}
            duration={toast.duration || 3000}
            onOpenChange={(open) => {
              if (!open) removeToast(toast.id)
            }}
            style={{
              width: '356px',
              padding: '16px',
              backgroundColor: 'var(--color-ui-inactive-bg)',
              border: '1px solid var(--color-ui-inactive-border)',
              borderRadius: '12px',
            }}
          >
            <ToastPrimitive.Title
              style={{
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '150%',
                color: '#FFFFFF',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {toast.title}
            </ToastPrimitive.Title>
            {toast.description && (
              <ToastPrimitive.Description
                style={{
                  fontSize: '12px',
                  fontWeight: 400,
                  lineHeight: '150%',
                  color: '#737373',
                  marginTop: '8px',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {toast.description}
              </ToastPrimitive.Description>
            )}
          </ToastPrimitive.Root>
        ))}
        <ToastPrimitive.Viewport
          style={{
            position: 'fixed',
            top: '16px',
            right: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            width: '356px',
            maxWidth: '100vw',
            margin: 0,
            listStyle: 'none',
            zIndex: 9999,
            outline: 'none',
          }}
        />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}
