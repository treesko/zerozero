"use client"
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Button } from './Button'
import { ThemeToggle } from './ThemeToggle'
import { cn } from '@/lib/cn'
import { useActiveSection } from '@/lib/useActiveSection'

type Dict = any
const linkKeys = ['home','services','about','team','industries','tools','testimonials','resources','faq','pricing','contact'] as const
const pageRoutes: Partial<Record<typeof linkKeys[number], boolean>> = { team: true }

export function NavBar({ locale, t }: { locale: 'en'|'sq'|'de', t: Dict }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === `/${locale}`
  const activeSection = useActiveSection([...linkKeys])

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
    <header className={cn('sticky top-0 z-50 w-full transition-colors', scrolled ? 'bg-white/80 backdrop-blur-10 border-b border-primary-100 dark:bg-primary-950/90 dark:border-primary-800' : 'bg-transparent')}
      aria-label="Main Navigation">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        <a href={`/${locale}`} aria-label={`${t.brand} home`} className="flex-shrink-0">
          <Image
            src="/images/logo.svg"
            alt={t.brand}
            width={160}
            height={35}
            priority
            className="h-8 w-auto dark:hidden"
          />
          <Image
            src="/images/logo-white.svg"
            alt={t.brand}
            width={160}
            height={35}
            priority
            className="hidden h-8 w-auto dark:block"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {linkKeys.map(key => {
            const label = t.nav[key]
            const base = `/${locale}`
            const isPageRoute = pageRoutes[key]
            const href = isPageRoute
              ? `${base}/${key}`
              : (isHome ? `#${key}` : `${base}/#${key}`)
            const isActive = isPageRoute
              ? pathname === `${base}/${key}`
              : (isHome && activeSection === key)
            return (
              <a
                key={key}
                href={href}
                className={cn(
                  'nav-underline text-sm font-medium transition-colors',
                  isActive
                    ? 'text-accent dark:text-accent'
                    : 'text-primary-700 hover:text-primary dark:text-primary-200 dark:hover:text-white'
                )}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            )
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <LangSwitcher locale={locale} />
          <ThemeToggle />
          <Button as="a" href={isHome ? '#contact' : `/${locale}/#contact`}>{t.nav.cta}</Button>
        </div>

        {/* Mobile menu button - 44px touch target */}
        <button
          className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-md border border-primary-200 text-primary-700 hover:bg-primary-50 active:bg-primary-100 dark:border-primary-700 dark:text-primary-200 dark:hover:bg-primary-800"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(v => !v)}
        >
          <span className="sr-only">Toggle menu</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          'md:hidden fixed inset-0 z-[60] bg-white dark:bg-primary-950 transition-all duration-300',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        {/* Mobile menu header */}
        <div className="flex items-center justify-between border-b border-primary-100 bg-white px-6 py-4 dark:border-primary-800 dark:bg-primary-950">
          <a href={`/${locale}`} onClick={() => setOpen(false)} className="flex-shrink-0">
            <Image
              src="/images/logo.svg"
              alt={t.brand}
              width={140}
              height={30}
              className="h-7 w-auto dark:hidden"
            />
            <Image
              src="/images/logo-white.svg"
              alt={t.brand}
              width={140}
              height={30}
              className="hidden h-7 w-auto dark:block"
            />
          </a>
          <button
            onClick={() => setOpen(false)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-primary-200 text-primary-700 hover:bg-primary-50 active:bg-primary-100 dark:border-primary-700 dark:text-primary-200 dark:hover:bg-primary-800"
            aria-label="Close menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile menu content */}
        <div className="flex h-[calc(100%-73px)] flex-col overflow-y-auto bg-white px-8 py-6 dark:bg-primary-950">
          <div className="mb-6 flex items-center gap-4">
            <LangSwitcher locale={locale} mobile />
            <ThemeToggle />
          </div>
          <nav className="flex flex-col gap-2">
            {linkKeys.map(key => {
              const label = t.nav[key]
              const base = `/${locale}`
              const isPageRoute = pageRoutes[key]
              const href = isPageRoute
                ? `${base}/${key}`
                : (isHome ? `#${key}` : `${base}/#${key}`)
              return (
                <a
                  key={key}
                  href={href}
                  className="rounded-lg px-4 py-3 text-lg font-semibold text-primary transition-colors hover:bg-primary-50 hover:text-accent active:bg-primary-100 dark:text-white dark:hover:bg-primary-800 dark:hover:text-accent"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </a>
              )
            })}
          </nav>
          <div className="mt-6">
            <Button as="a" href={isHome ? '#contact' : `/${locale}/#contact`} className="w-full" onClick={() => setOpen(false)}>{t.nav.cta}</Button>
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
    <nav className={cn('flex items-center', mobile ? 'gap-1' : 'gap-1')} aria-label="Language selector">
      {langs.map(l => (
        <a
          key={l.code}
          href={`/${l.code}${rest}`}
          className={cn(
            'font-semibold uppercase tracking-wide transition-colors',
            mobile ? 'px-3 py-2 text-sm' : 'px-2 py-1 text-xs',
            l.code === locale
              ? 'text-primary dark:text-white'
              : 'text-primary-400 hover:text-primary dark:text-primary-400 dark:hover:text-white'
          )}
        >
          {l.label}
        </a>
      ))}
    </nav>
  )
}
