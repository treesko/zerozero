"use client"
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from './Button'
import { cn } from '@/lib/cn'

type Dict = any
const linkKeys = ['home','services','about','industries','testimonials','resources','pricing','contact'] as const

export function NavBar({ locale, t }: { locale: 'en'|'sq'|'de', t: Dict }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === `/${locale}`

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
  }, [open])

  return (
    <header className={cn('sticky top-0 z-50 w-full transition-colors', scrolled ? 'bg-white/80 backdrop-blur-10 border-b border-slate-200' : 'bg-transparent')}
      aria-label="Main Navigation">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        <a href={`/${locale}`} className="text-xl font-extrabold tracking-tight text-primary" aria-label={`${t.brand} home`}>
          {t.brand}
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {linkKeys.map(key => {
            const label = t.nav[key]
            const base = `/${locale}`
            const href = isHome ? `#${key}` : `${base}/#${key}`
            return (
              <a key={key} href={href} className="nav-underline text-sm font-medium text-slate-700 hover:text-primary" onClick={() => setOpen(false)}>
              {label}
              </a>
            )
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <LangSwitcher locale={locale} />
          <Button as="a" href={isHome ? '#contact' : `/${locale}/#contact`}>{t.nav.cta}</Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(v => !v)}
        >
          <span className="sr-only">Toggle menu</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {open ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        className={cn(
          'md:hidden fixed inset-0 z-40 bg-white/95 backdrop-blur-10 transition-opacity duration-300',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-center gap-8 px-8">
          <LangSwitcher locale={locale} mobile />
          {linkKeys.map(key => {
            const label = t.nav[key]
            const base = `/${locale}`
            const href = isHome ? `#${key}` : `${base}/#${key}`
            return (
              <a key={key} href={href} className="text-2xl font-semibold text-primary" onClick={() => setOpen(false)}>
                {label}
              </a>
            )
          })}
          <div>
            <Button as="a" href={isHome ? '#contact' : `/${locale}/#contact`} className="w-full">{t.nav.cta}</Button>
          </div>
        </div>
      </div>
    </header>
  )
}

function LangSwitcher({ locale, mobile }: { locale: 'en'|'sq'|'de', mobile?: boolean }) {
  const pathname = usePathname()
  const rest = pathname.replace(/^\/(en|sq|de)/, '') || ''
  const langs: Array<{ code: 'en'|'sq'|'de', label: string }> = [
    { code: 'en', label: 'EN' },
    { code: 'sq', label: 'SQ' },
    { code: 'de', label: 'DE' },
  ]
  return (
    <div className={cn('flex items-center gap-2', mobile ? 'mb-6' : '')} aria-label="Language selector">
      {langs.map(l => (
        <a key={l.code} href={`/${l.code}${rest}`} className={cn('text-xs font-semibold uppercase tracking-wide', l.code === locale ? 'text-primary' : 'text-slate-500 hover:text-primary')}>
          {l.label}
        </a>
      ))}
    </div>
  )
}
