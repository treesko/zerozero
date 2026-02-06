import React from 'react'
import { cn } from '@/lib/cn'

type Props = {
  title: string
  description: string
  icon?: React.ReactNode
  className?: string
}

export function ServiceCard({ title, description, icon, className }: Props) {
  return (
    <div className={cn('reveal rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-subtle dark:border-slate-700 dark:bg-slate-800', className)}>
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-soft-bg text-primary dark:bg-slate-700 dark:text-accent">
        {icon}
      </div>
      <h3 className="mb-2 text-base font-semibold text-primary dark:text-white">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  )
}

