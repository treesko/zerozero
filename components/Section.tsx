import React from 'react'
import { cn } from '@/lib/cn'

type Props = React.HTMLAttributes<HTMLElement> & {
  container?: boolean
}

export function Section({ className, children, container = true, ...props }: Props) {
  return (
    <section className={cn('py-20 md:py-28', className)} {...props}>
      <div className={cn(container && 'mx-auto max-w-7xl px-6 md:px-8')}>{children}</div>
    </section>
  )
}

