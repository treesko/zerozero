import React from 'react'
import { cn } from '@/lib/cn'
import { Button } from '../Button'

type Props = {
  name: string
  price: string
  description: string
  features: string[]
  highlighted?: boolean
  mostPopularText?: string
}

export function PricingCard({ name, price, description, features, highlighted, mostPopularText = 'Most Popular' }: Props) {
  return (
    <div className={cn(
      'reveal flex h-full flex-col rounded-2xl border p-6 shadow-sm',
      highlighted ? 'border-accent bg-white shadow-subtle dark:bg-primary-900' : 'border-primary-100 bg-white dark:border-primary-800 dark:bg-primary-900'
    )}>
      <div className="mb-4 flex items-baseline justify-between">
        <h3 className="text-lg font-semibold text-primary dark:text-white">{name}</h3>
        {highlighted && (
          <span className="rounded-full bg-accent/10 px-2 py-1 text-xs font-semibold text-accent dark:bg-accent/20">{mostPopularText}</span>
        )}
      </div>
      <div className="mb-2 text-2xl font-extrabold text-primary dark:text-white">{price}</div>
      <p className="mb-4 text-sm text-primary-600 dark:text-primary-300">{description}</p>
      <ul className="mb-6 space-y-2 text-sm text-primary-700 dark:text-primary-200">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <svg className="mt-0.5 text-accent" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        <Button as="a" href="#contact" variant={highlighted ? 'primary' : 'secondary'} className="w-full">
          Request a Quote
        </Button>
      </div>
    </div>
  )
}
