import type { EmptyStateProps } from '@/types/emptyState'

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="flex flex-col items-center w-[314px] gap-4">
        <p className="w-full text-base font-light text-neutral-50 text-center leading-normal">
          {title}
        </p>
        {description && (
          <p className="w-full text-sm font-normal text-neutral-500 text-center">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
