'use client'

import { useState, useMemo } from 'react'
import { Button } from '../Button'

type BreakEvenResult = {
  breakEvenUnits: number
  breakEvenRevenue: number
  contributionMargin: number
  contributionMarginRatio: number
}

type BreakEvenTranslations = {
  title: string
  subtitle: string
  fixedCosts: string
  fixedCostsHint: string
  fixedCostsPlaceholder: string
  variableCost: string
  variableCostHint: string
  variableCostPlaceholder: string
  sellingPrice: string
  sellingPricePlaceholder: string
  priceError: string
  calculateBtn: string
  breakEvenUnits: string
  breakEvenRevenue: string
  contributionMargin: string
  contributionRatio: string
  chartTitle: string
  chartRevenue: string
  chartTotalCost: string
  chartBreakEven: string
  chartEur: string
  chartUnits: string
  whatThisMeans: string
  insightText: string
  advisorCta: string
  talkToAdvisors: string
}

function calculateBreakEven(
  fixedCosts: number,
  variableCostPerUnit: number,
  pricePerUnit: number
): BreakEvenResult | null {
  if (pricePerUnit <= variableCostPerUnit) {
    return null
  }

  const contributionMargin = pricePerUnit - variableCostPerUnit
  const contributionMarginRatio = contributionMargin / pricePerUnit
  const breakEvenUnits = Math.ceil(fixedCosts / contributionMargin)
  const breakEvenRevenue = breakEvenUnits * pricePerUnit

  return {
    breakEvenUnits,
    breakEvenRevenue,
    contributionMargin,
    contributionMarginRatio,
  }
}

type BreakEvenCalculatorProps = {
  locale: string
  t: BreakEvenTranslations | Record<string, unknown>
}

export function BreakEvenCalculator({ locale, t: tRaw }: BreakEvenCalculatorProps) {
  const t = tRaw as BreakEvenTranslations
  const [fixedCosts, setFixedCosts] = useState('')
  const [variableCost, setVariableCost] = useState('')
  const [price, setPrice] = useState('')
  const [showVisualization, setShowVisualization] = useState(false)

  const result = useMemo(() => {
    const fixed = parseFloat(fixedCosts.replace(/[^0-9.]/g, '')) || 0
    const variable = parseFloat(variableCost.replace(/[^0-9.]/g, '')) || 0
    const priceNum = parseFloat(price.replace(/[^0-9.]/g, '')) || 0

    if (fixed > 0 && variable >= 0 && priceNum > 0) {
      return calculateBreakEven(fixed, variable, priceNum)
    }
    return null
  }, [fixedCosts, variableCost, price])

  const handleCalculate = () => {
    if (result) {
      setShowVisualization(true)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('de-DE').format(value)
  }

  const formatPercent = (value: number) => {
    return `${Math.round(value * 100)}%`
  }

  const inputClass =
    'w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white'
  const labelClass = 'mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300'

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-800 md:p-8">
        <div className="mb-6 text-center">
          <h3 className="mb-2 text-2xl font-bold text-primary dark:text-white">{t.title}</h3>
          <p className="text-slate-600 dark:text-slate-400">{t.subtitle}</p>
        </div>

        <div className="space-y-5">
          {/* Fixed Costs */}
          <div>
            <label htmlFor="fixedCosts" className={labelClass}>
              {t.fixedCosts}
              <span className="ml-1 text-xs text-slate-400" title={t.fixedCostsHint}>
                ⓘ
              </span>
            </label>
            <input
              id="fixedCosts"
              type="text"
              inputMode="numeric"
              placeholder={t.fixedCostsPlaceholder}
              value={fixedCosts}
              onChange={(e) => {
                setFixedCosts(e.target.value)
                setShowVisualization(false)
              }}
              className={inputClass}
            />
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {t.fixedCostsHint}
            </p>
          </div>

          {/* Variable Cost Per Unit */}
          <div>
            <label htmlFor="variableCost" className={labelClass}>
              {t.variableCost}
              <span className="ml-1 text-xs text-slate-400" title={t.variableCostHint}>
                ⓘ
              </span>
            </label>
            <input
              id="variableCost"
              type="text"
              inputMode="numeric"
              placeholder={t.variableCostPlaceholder}
              value={variableCost}
              onChange={(e) => {
                setVariableCost(e.target.value)
                setShowVisualization(false)
              }}
              className={inputClass}
            />
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {t.variableCostHint}
            </p>
          </div>

          {/* Selling Price Per Unit */}
          <div>
            <label htmlFor="price" className={labelClass}>
              {t.sellingPrice}
            </label>
            <input
              id="price"
              type="text"
              inputMode="numeric"
              placeholder={t.sellingPricePlaceholder}
              value={price}
              onChange={(e) => {
                setPrice(e.target.value)
                setShowVisualization(false)
              }}
              className={inputClass}
            />
          </div>

          {/* Error Message */}
          {price && variableCost && parseFloat(price) <= parseFloat(variableCost) && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
              {t.priceError}
            </div>
          )}

          {/* Calculate Button */}
          <Button
            onClick={handleCalculate}
            disabled={!result}
            className="w-full"
          >
            {t.calculateBtn}
          </Button>
        </div>

        {/* Results */}
        {showVisualization && result && (
          <div className="mt-8 space-y-6">
            {/* Key Metrics */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-accent/10 p-4 text-center dark:bg-accent/20">
                <p className="text-sm text-slate-600 dark:text-slate-400">{t.breakEvenUnits}</p>
                <p className="mt-1 text-3xl font-bold text-accent">
                  {formatNumber(result.breakEvenUnits)}
                </p>
              </div>
              <div className="rounded-xl bg-primary/10 p-4 text-center dark:bg-primary/20">
                <p className="text-sm text-slate-600 dark:text-slate-400">{t.breakEvenRevenue}</p>
                <p className="mt-1 text-3xl font-bold text-primary dark:text-white">
                  {formatCurrency(result.breakEvenRevenue)}
                </p>
              </div>
            </div>

            {/* Additional Metrics */}
            <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-700">
              <div className="grid gap-4 text-sm sm:grid-cols-2">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">{t.contributionMargin}</span>
                  <span className="font-semibold text-slate-800 dark:text-white">
                    {formatCurrency(result.contributionMargin)} / unit
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">{t.contributionRatio}</span>
                  <span className="font-semibold text-slate-800 dark:text-white">
                    {formatPercent(result.contributionMarginRatio)}
                  </span>
                </div>
              </div>
            </div>

            {/* Simple Visualization */}
            <div>
              <p className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                {t.chartTitle}
              </p>
              <div className="relative h-48 rounded-lg bg-slate-50 p-4 dark:bg-slate-700">
                {/* Y-axis label */}
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-slate-500">
                  {t.chartEur}
                </div>

                {/* Chart area */}
                <svg className="h-full w-full" viewBox="0 0 400 150" preserveAspectRatio="none">
                  {/* Grid lines */}
                  <line x1="40" y1="10" x2="40" y2="130" className="stroke-slate-300 dark:stroke-slate-500" strokeWidth="1" />
                  <line x1="40" y1="130" x2="390" y2="130" className="stroke-slate-300 dark:stroke-slate-500" strokeWidth="1" />

                  {/* Fixed costs line */}
                  <line
                    x1="40"
                    y1={130 - (parseFloat(fixedCosts) / result.breakEvenRevenue) * 100}
                    x2="390"
                    y2={130 - (parseFloat(fixedCosts) / result.breakEvenRevenue) * 100}
                    className="stroke-slate-400 dark:stroke-slate-500"
                    strokeWidth="1"
                    strokeDasharray="4"
                  />

                  {/* Total Cost line */}
                  <line
                    x1="40"
                    y1={130 - (parseFloat(fixedCosts) / (result.breakEvenRevenue * 1.5)) * 100}
                    x2="390"
                    y2="10"
                    className="stroke-red-500"
                    strokeWidth="2"
                  />

                  {/* Revenue line */}
                  <line x1="40" y1="130" x2="390" y2="10" className="stroke-accent" strokeWidth="2" />

                  {/* Break-even point */}
                  <circle
                    cx={40 + (result.breakEvenUnits / (result.breakEvenUnits * 1.5)) * 350}
                    cy={130 - (result.breakEvenRevenue / (result.breakEvenRevenue * 1.5)) * 120}
                    r="6"
                    className="fill-green-500 stroke-white dark:stroke-slate-800"
                    strokeWidth="2"
                  />
                </svg>

                {/* Legend */}
                <div className="absolute bottom-2 right-2 flex gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="h-0.5 w-4 bg-blue-500" />
                    <span className="text-slate-600 dark:text-slate-400">{t.chartRevenue}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-0.5 w-4 bg-red-500" />
                    <span className="text-slate-600 dark:text-slate-400">{t.chartTotalCost}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-slate-600 dark:text-slate-400">{t.chartBreakEven}</span>
                  </div>
                </div>

                {/* X-axis label */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-slate-500">
                  {t.chartUnits}
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-600">
              <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                {t.whatThisMeans}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t.insightText
                  .replace('{units}', formatNumber(result.breakEvenUnits))
                  .replace('{margin}', formatCurrency(result.contributionMargin))}
              </p>
            </div>

            {/* CTA */}
            <div className="text-center">
              <p className="mb-3 text-sm text-slate-600 dark:text-slate-400">
                {t.advisorCta}
              </p>
              <Button as="a" href={`/${locale}#contact`}>
                {t.talkToAdvisors}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
