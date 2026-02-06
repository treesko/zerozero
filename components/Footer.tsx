import React from 'react'

type Dict = any

export function Footer({ locale, t }: { locale: 'en'|'sq'|'de', t: Dict }) {
  const year = new Date().getFullYear()
  const base = `/${locale}`
  return (
    <footer className="border-t border-slate-200 dark:border-slate-700">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="space-y-2">
            <div className="text-lg font-extrabold text-primary dark:text-white">{t.brand}</div>
            <p className="text-sm text-slate-600 dark:text-slate-400">© {year} {t.brand}. {t.footer.rights}</p>
          </div>

          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <nav className="flex gap-6 text-sm text-slate-700 dark:text-slate-300">
              <a href={`${base}/#services`} className="hover:text-primary dark:hover:text-white">{t.nav.services}</a>
              <a href={`${base}/#about`} className="hover:text-primary dark:hover:text-white">{t.nav.about}</a>
              <a href={`${base}/#pricing`} className="hover:text-primary dark:hover:text-white">{t.nav.pricing}</a>
              <a href={`${base}/#contact`} className="hover:text-primary dark:hover:text-white">{t.nav.contact}</a>
            </nav>
            <div className="flex gap-3">
              <a aria-label="LinkedIn" href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4zM8 8h3.8v2.2h.1c.5-1 1.8-2.2 3.8-2.2 4 0 4.7 2.6 4.7 6v8h-4v-7.1c0-1.7 0-3.9-2.4-3.9-2.4 0-2.8 1.8-2.8 3.8V24H8z"/></svg>
              </a>
              <a aria-label="Facebook" href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 10-11.5 9.9v-7H8v-3h2.5V9.5A3.5 3.5 0 0114 6h3v3h-3a1 1 0 00-1 1V12h4l-.6 3h-3.4v7A10 10 0 0022 12z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-xs text-slate-500 dark:text-slate-400">
          <a href={`${base}/privacy`} className="hover:text-primary dark:hover:text-white">{t.footer.privacy}</a>
        </div>
      </div>
    </footer>
  )
}
