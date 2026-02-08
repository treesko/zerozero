import React from 'react'
import { cn } from '@/lib/cn'

type Props = React.HTMLAttributes<HTMLElement> & {
  container?: boolean
}

export function Section({ className, children, container = true, ...props }: Props) {
  return (
    <section className={cn('py-12 sm:py-16 md:py-24', className)} {...props}>
      <div className={cn(container && 'mx-auto max-w-7xl px-4 sm:px-6 md:px-8')}>{children}</div>
    </section>
  )
}

