'use client'

import { useState, useCallback } from 'react'
import { Button } from '../Button'

const VAT_RATE = 0.18

type ActiveField = 'base' | 'total'

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

function round2(n: number) {
  return Math.round(n * 100) / 100
}

export function TVSHCalculator({ locale, t: tRaw }: TVSHCalculatorProps) {
  const t = tRaw as TVSHTranslations
  const [baseInput, setBaseInput] = useState('')
  const [totalInput, setTotalInput] = useState('')
  const [tvsh, setTvsh] = useState<number | null>(null)
  const [activeField, setActiveField] = useState<ActiveField | null>(null)
  const [showTaxInfo, setShowTaxInfo] = useState(false)

  const fmt = (value: number) =>
    new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)

  const fmtInput = (value: number) =>
    value % 1 === 0 ? value.toString() : round2(value).toString()

  const handleBaseChange = useCallback((raw: string) => {
    setBaseInput(raw)
    setActiveField('base')
    const num = parseFloat(raw.replace(/[^0-9.]/g, '')) || 0
    if (num <= 0) {
      setTotalInput('')
      setTvsh(null)
      return
    }
    const base = round2(num)
    const vatAmount = round2(base * VAT_RATE)
    const total = round2(base + vatAmount)
    setTotalInput(fmtInput(total))
    setTvsh(vatAmount)
  }, [])

  const handleTotalChange = useCallback((raw: string) => {
    setTotalInput(raw)
    setActiveField('total')
    const num = parseFloat(raw.replace(/[^0-9.]/g, '')) || 0
    if (num <= 0) {
      setBaseInput('')
      setTvsh(null)
      return
    }
    const total = round2(num)
    const base = round2(total / (1 + VAT_RATE))
    const vatAmount = round2(total - base)
    setBaseInput(fmtInput(base))
    setTvsh(vatAmount)
  }, [])

  const hasValue = tvsh !== null

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

        {/* Two input fields side by side */}
        <div className="mb-5 grid grid-cols-2 gap-3">
          {/* Base input */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-primary-700 dark:text-primary-200">
              {t.baseAmount}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-semibold text-primary-400">€</span>
              <input
                type="text"
                inputMode="decimal"
                placeholder={t.basePlaceholder}
                value={baseInput}
                onChange={(e) => handleBaseChange(e.target.value)}
                className={`w-full rounded-xl border-2 bg-primary-50/50 py-3 pl-9 pr-3 text-xl font-bold text-primary outline-none transition-colors focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20 dark:bg-primary-800 dark:text-white dark:focus:bg-primary-900 ${
                  activeField === 'base' ? 'border-accent' : 'border-primary-200 dark:border-primary-700'
                }`}
              />
            </div>
          </div>

          {/* Total input */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-primary-700 dark:text-primary-200">
              {t.totalAmount}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-semibold text-primary-400">€</span>
              <input
                type="text"
                inputMode="decimal"
                placeholder={t.totalPlaceholder}
                value={totalInput}
                onChange={(e) => handleTotalChange(e.target.value)}
                className={`w-full rounded-xl border-2 bg-primary-50/50 py-3 pl-9 pr-3 text-xl font-bold text-primary outline-none transition-colors focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20 dark:bg-primary-800 dark:text-white dark:focus:bg-primary-900 ${
                  activeField === 'total' ? 'border-accent' : 'border-primary-200 dark:border-primary-700'
                }`}
              />
            </div>
          </div>
        </div>

        {/* TVSH result — always visible when there's a value */}
        {hasValue && (
          <div className="space-y-4">
            <div className="rounded-xl bg-amber-50 p-4 text-center dark:bg-amber-900/20">
              <p className="text-sm font-medium text-primary-500 dark:text-primary-400">{t.tvshAmount}</p>
              <p className="mt-0.5 text-2xl font-bold text-amber-600 dark:text-amber-400 sm:text-3xl">
                {fmt(tvsh)}
              </p>
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
