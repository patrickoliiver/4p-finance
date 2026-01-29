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
        <RadixDialog.Overlay className="fixed inset-0 bg-[#000000CC] z-50" />
        <RadixDialog.Content className="fixed left-1/2 top-[42px] -translate-x-1/2 w-[552px] min-h-[172px] max-w-[90vw] bg-[#171717] border border-[var(--color-ui-inactive-border)] rounded-2xl p-6 z-[51]">
          <RadixDialog.Title className="text-sm font-normal leading-none tracking-normal text-neutral-50 mb-4">
            {title}
          </RadixDialog.Title>
          
          {description && (
            <RadixDialog.Description className="hidden">
              {description}
            </RadixDialog.Description>
          )}

          <RadixDialog.Close asChild>
            <button
              className="absolute right-[9px] top-[9px] w-[26px] h-[26px] p-0 bg-[#262626] border-none cursor-pointer rounded-full flex items-center justify-center"
              aria-label="Fechar"
            >
              <Cross1Icon width={14} height={14} className="text-neutral-500" />
            </button>
          </RadixDialog.Close>

          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
