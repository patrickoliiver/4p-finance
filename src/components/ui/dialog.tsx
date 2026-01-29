import * as RadixDialog from '@radix-ui/react-dialog'
import { Cross1Icon } from '@radix-ui/react-icons'
import { type ReactNode } from 'react'

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: ReactNode
}

export function Dialog({ open, onOpenChange, title, description, children }: DialogProps) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(12px)',
            zIndex: 50,
          }}
        />
        <RadixDialog.Content
          style={{
            position: 'fixed',
            left: '50%',
            top: '42px',
            transform: 'translateX(-50%)',
            width: '552px',
            height: '172px',
            maxWidth: '90vw',
            backgroundColor: '#171717',
            border: '1px solid var(--color-ui-inactive-border)',
            borderRadius: '16px',
            paddingTop: '25px',
            paddingRight: '24px',
            paddingBottom: '25px',
            paddingLeft: '24px',
            gap: '24px',
            zIndex: 51,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <RadixDialog.Title
            style={{
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '100%',
              letterSpacing: '0%',
              color: '#FAFAFA',
              marginBottom: '12px',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {title}
          </RadixDialog.Title>
          
          {description && (
            <RadixDialog.Description style={{ display: 'none' }}>
              {description}
            </RadixDialog.Description>
          )}

          <RadixDialog.Close asChild>
            <button
              style={{
                position: 'absolute',
                right: '9px',
                top: '9px',
                width: '26px',
                height: '26px',
                padding: '0',
                backgroundColor: '#262626',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Fechar"
            >
              <Cross1Icon width={14} height={14} style={{ color: '#737373' }} />
            </button>
          </RadixDialog.Close>

          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
