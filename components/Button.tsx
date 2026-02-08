import React from 'react'
import { cn } from '@/lib/cn'

function LoadingSpinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  as?: 'button' | 'a'
  href?: string
  loading?: boolean
  loadingText?: string
}

export function Button({
  variant = 'primary',
  className,
  as = 'button',
  href,
  children,
  loading = false,
  loadingText,
  disabled,
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-all duration-200 ease-pleasant focus:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
  const variants = {
    primary: 'bg-primary text-white hover:-translate-y-0.5 hover:shadow-subtle',
    secondary: 'border border-primary-200 text-primary hover:bg-primary-50 hover:-translate-y-0.5 dark:border-primary-600 dark:text-white dark:hover:bg-primary-800',
    ghost: 'text-primary hover:bg-primary-50 dark:text-white dark:hover:bg-primary-800',
  }

  const isDisabled = disabled || loading

  if (as === 'a' && href) {
    return (
      <a
        href={href}
        className={cn(base, variants[variant], className)}
        aria-disabled={isDisabled}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      className={cn(base, variants[variant], className)}
      disabled={isDisabled}
      aria-busy={loading}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {loading && loadingText ? loadingText : children}
    </button>
  )
}
