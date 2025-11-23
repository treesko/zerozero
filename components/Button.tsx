import React from 'react'
import { cn } from '@/lib/cn'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  as?: 'button' | 'a'
  href?: string
}

export function Button({ variant = 'primary', className, as = 'button', href, children, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition-transform duration-200 ease-pleasant focus:outline-none focus-visible:ring-2 focus-visible:ring-accent'
  const variants = {
    primary: 'bg-primary text-white hover:-translate-y-0.5 hover:shadow-subtle',
    secondary: 'border border-slate-300 text-primary hover:bg-slate-50 hover:-translate-y-0.5',
    ghost: 'text-primary hover:bg-slate-50',
  }

  if (as === 'a' && href) {
    return <a href={href} className={cn(base, variants[variant], className)} {...(props as any)}>{children}</a>
  }

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  )
}
