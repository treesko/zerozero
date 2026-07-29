import React from 'react'
import Image from 'next/image'

type Dict = any

export function Footer({ locale, t }: { locale: 'en'|'sq'|'de', t: Dict }) {
  const year = new Date().getFullYear()
  const base = `/${locale}`
  return (
    <footer className="border-t border-primary-100 dark:border-primary-800">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="space-y-3">
            <a href={`/${locale}`} className="inline-block">
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
            <p className="text-sm text-primary-600 dark:text-primary-300">© {year} {t.brand}. {t.footer.rights}</p>
          </div>

          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-primary-700 dark:text-primary-200">
              <a href={`${base}/#services`} className="hover:text-primary dark:hover:text-white">{t.nav.services}</a>
              <a href={`${base}/#about`} className="hover:text-primary dark:hover:text-white">{t.nav.about}</a>
              <a href={`${base}/team`} className="hover:text-primary dark:hover:text-white">{t.nav.team}</a>
              <a href={`${base}/#faq`} className="hover:text-primary dark:hover:text-white">{t.nav.faq}</a>
              <a href={`${base}/#contact`} className="hover:text-primary dark:hover:text-white">{t.nav.contact}</a>
            </nav>
            <div className="flex gap-3">
              <a aria-label="Facebook" href="https://www.facebook.com/profile.php?id=61561896255149" target="_blank" rel="noopener noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary-200 text-primary-700 hover:bg-primary-50 dark:border-primary-700 dark:text-primary-200 dark:hover:bg-primary-800">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 10-11.5 9.9v-7H8v-3h2.5V9.5A3.5 3.5 0 0114 6h3v3h-3a1 1 0 00-1 1V12h4l-.6 3h-3.4v7A10 10 0 0022 12z"/></svg>
              </a>
              <a aria-label="Instagram" href="https://www.instagram.com/zerozeroaccounting/" target="_blank" rel="noopener noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary-200 text-primary-700 hover:bg-primary-50 dark:border-primary-700 dark:text-primary-200 dark:hover:bg-primary-800">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-xs text-primary-500 dark:text-primary-400">
          <a href={`${base}/privacy`} className="hover:text-primary dark:hover:text-white">{t.footer.privacy}</a>
        </div>
      </div>
    </footer>
  )
}
