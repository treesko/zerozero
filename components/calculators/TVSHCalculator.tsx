'use client'

import { useState, useMemo } from 'react'
import { Button } from '../Button'

const VAT_RATE = 0.18

type TVSHMode = 'base' | 'total'

type TVSHBreakdown = {
  base: number
  tvsh: number
  total: number
}

type TVSHTranslations = {
  title: string
  subtitle: string
  fromBase: string
  fromTotal: string
  basePlaceholder: string
  totalPlaceholder: string
  baseLabel: string
  baseAmount: string
  tvshAmount: string
  totalAmount: string
  taxInfo: string
  taxRate: string
  cta: string
}

type TVSHCalculatorProps = {
  locale: string
  t: TVSHTranslations | Record<string, unknown>
}

export function TVSHCalculator({ locale, t: tRaw }: TVSHCalculatorProps) {
  const t = tRaw as TVSHTranslations
  const [mode, setMode] = useState<TVSHMode>('total')
  const [amount, setAmount] = useState('')
  const [showTaxInfo, setShowTaxInfo] = useState(false)

  const breakdown = useMemo<TVSHBreakdown | null>(() => {
    const num = parseFloat(amount.replace(/[^0-9.]/g, '')) || 0
    if (num <= 0) return null

    if (mode === 'base') {
      const base = Math.round(num * 100) / 100
      const tvsh = Math.round(base * VAT_RATE * 100) / 100
      const total = Math.round((base + tvsh) * 100) / 100
      return { base, tvsh, total }
    } else {
      const total = Math.round(num * 100) / 100
      const base = Math.round((total / (1 + VAT_RATE)) * 100) / 100
      const tvsh = Math.round((total - base) * 100) / 100
      return { base, tvsh, total }
    }
  }, [amount, mode])

  const fmt = (value: number) =>
    new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)

  return (
    <div className="mx-auto max-w-xl">
      <div className="min-h-[420px] rounded-2xl border border-primary-100 bg-white p-5 shadow-lg sm:min-h-[460px] sm:p-8 dark:border-primary-800 dark:bg-primary-900">

        {/* Header */}
        <div className="mb-6 text-center">
          <h3 className="mb-1 text-2xl font-bold text-primary dark:text-white sm:text-3xl">
            {t.title}
          </h3>
          <p className="text-sm text-primary-600 dark:text-primary-300">{t.subtitle}</p>
        </div>

        {/* Mode toggle */}
        <div className="mb-5 flex justify-center">
          <div className="inline-flex rounded-full bg-primary-100 p-0.5 dark:bg-primary-800">
            <button
              onClick={() => setMode('base')}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                mode === 'base'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-primary-600 hover:text-primary dark:text-primary-300'
              }`}
            >
              {t.fromBase}
            </button>
            <button
              onClick={() => setMode('total')}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                mode === 'total'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-primary-600 hover:text-primary dark:text-primary-300'
              }`}
            >
              {t.fromTotal}
            </button>
          </div>
        </div>

        {/* Amount Input */}
        <div className="relative mb-5">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-semibold text-primary-400">€</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder={mode === 'base' ? t.basePlaceholder : t.totalPlaceholder}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-xl border-2 border-primary-200 bg-primary-50/50 py-3.5 pl-10 pr-4 text-2xl font-bold text-primary outline-none transition-colors focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20 dark:border-primary-700 dark:bg-primary-800 dark:text-white dark:focus:bg-primary-900"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-primary-400">
            {mode === 'base' ? t.baseLabel : t.totalAmount}
          </span>
        </div>

        {/* Results */}
        {breakdown && (
          <div className="space-y-4">
            {/* Three result cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-primary-100 p-3 text-center dark:bg-primary-800">
                <p className="text-sm text-primary-500 dark:text-primary-400">{t.baseAmount}</p>
                <p className="mt-0.5 text-lg font-bold text-primary-800 dark:text-white sm:text-xl">
                  {fmt(breakdown.base)}
                </p>
              </div>
              <div className="rounded-xl bg-amber-50 p-3 text-center dark:bg-amber-900/20">
                <p className="text-sm text-primary-500 dark:text-primary-400">{t.tvshAmount}</p>
                <p className="mt-0.5 text-lg font-bold text-amber-600 dark:text-amber-400 sm:text-xl">
                  {fmt(breakdown.tvsh)}
                </p>
              </div>
              <div className="rounded-xl bg-accent/10 p-3 text-center dark:bg-accent/20">
                <p className="text-sm text-primary-500 dark:text-primary-400">{t.totalAmount}</p>
                <p className="mt-0.5 text-lg font-bold text-accent sm:text-xl">
                  {fmt(breakdown.total)}
                </p>
              </div>
            </div>

            {/* Tax info toggle */}
            <div className="text-center">
              <button
                onClick={() => setShowTaxInfo(v => !v)}
                className="text-sm font-medium text-primary-500 hover:text-primary hover:underline dark:text-primary-400"
              >
                ℹ {t.taxInfo}
              </button>
            </div>

            {showTaxInfo && (
              <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                <p>• {t.taxRate}</p>
              </div>
            )}

            {/* CTA */}
            <Button as="a" href={`/${locale}#contact`} className="w-full">
              {t.cta}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
