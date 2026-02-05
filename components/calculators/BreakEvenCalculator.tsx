'use client'

import { useState, useMemo } from 'react'
import { Button } from '../Button'

type BreakEvenResult = {
  breakEvenUnits: number
  breakEvenRevenue: number
  contributionMargin: number
  contributionMarginRatio: number
}

function calculateBreakEven(
  fixedCosts: number,
  variableCostPerUnit: number,
  pricePerUnit: number
): BreakEvenResult | null {
  if (pricePerUnit <= variableCostPerUnit) {
    return null // Can't break even if price <= variable cost
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
  title?: string
  subtitle?: string
}

export function BreakEvenCalculator({
  locale,
  title = 'Break-Even Calculator',
  subtitle = 'Find out how many units you need to sell to cover your costs',
}: BreakEvenCalculatorProps) {
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

  // Generate chart data points
  const chartData = useMemo(() => {
    if (!result) return []

    const maxUnits = Math.ceil(result.breakEvenUnits * 1.5)
    const points = []
    const priceNum = parseFloat(price.replace(/[^0-9.]/g, '')) || 0
    const variableNum = parseFloat(variableCost.replace(/[^0-9.]/g, '')) || 0
    const fixedNum = parseFloat(fixedCosts.replace(/[^0-9.]/g, '')) || 0

    for (let units = 0; units <= maxUnits; units += Math.ceil(maxUnits / 10)) {
      const revenue = units * priceNum
      const totalCost = fixedNum + units * variableNum
      points.push({ units, revenue, totalCost })
    }

    return points
  }, [result, price, variableCost, fixedCosts])

  const inputClass =
    'w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white'
  const labelClass = 'mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300'

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-800 md:p-8">
        <div className="mb-6 text-center">
          <h3 className="mb-2 text-2xl font-bold text-primary dark:text-white">{title}</h3>
          <p className="text-slate-600 dark:text-slate-400">{subtitle}</p>
        </div>

        <div className="space-y-5">
          {/* Fixed Costs */}
          <div>
            <label htmlFor="fixedCosts" className={labelClass}>
              Monthly Fixed Costs (EUR)
              <span className="ml-1 text-xs text-slate-400" title="Rent, salaries, insurance, etc.">
                ⓘ
              </span>
            </label>
            <input
              id="fixedCosts"
              type="text"
              inputMode="numeric"
              placeholder="e.g., 10,000"
              value={fixedCosts}
              onChange={(e) => {
                setFixedCosts(e.target.value)
                setShowVisualization(false)
              }}
              className={inputClass}
            />
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Costs that don&apos;t change with production (rent, salaries, insurance)
            </p>
          </div>

          {/* Variable Cost Per Unit */}
          <div>
            <label htmlFor="variableCost" className={labelClass}>
              Variable Cost Per Unit (EUR)
              <span className="ml-1 text-xs text-slate-400" title="Materials, labor per unit">
                ⓘ
              </span>
            </label>
            <input
              id="variableCost"
              type="text"
              inputMode="numeric"
              placeholder="e.g., 25"
              value={variableCost}
              onChange={(e) => {
                setVariableCost(e.target.value)
                setShowVisualization(false)
              }}
              className={inputClass}
            />
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Costs that vary with each unit (materials, direct labor)
            </p>
          </div>

          {/* Selling Price Per Unit */}
          <div>
            <label htmlFor="price" className={labelClass}>
              Selling Price Per Unit (EUR)
            </label>
            <input
              id="price"
              type="text"
              inputMode="numeric"
              placeholder="e.g., 75"
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
              Selling price must be greater than variable cost per unit
            </div>
          )}

          {/* Calculate Button */}
          <Button
            onClick={handleCalculate}
            disabled={!result}
            className="w-full"
          >
            Calculate Break-Even Point
          </Button>
        </div>

        {/* Results */}
        {showVisualization && result && (
          <div className="mt-8 space-y-6">
            {/* Key Metrics */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-accent/10 p-4 text-center dark:bg-accent/20">
                <p className="text-sm text-slate-600 dark:text-slate-400">Break-Even Units</p>
                <p className="mt-1 text-3xl font-bold text-accent">
                  {formatNumber(result.breakEvenUnits)}
                </p>
              </div>
              <div className="rounded-xl bg-primary/10 p-4 text-center dark:bg-primary/20">
                <p className="text-sm text-slate-600 dark:text-slate-400">Break-Even Revenue</p>
                <p className="mt-1 text-3xl font-bold text-primary dark:text-white">
                  {formatCurrency(result.breakEvenRevenue)}
                </p>
              </div>
            </div>

            {/* Additional Metrics */}
            <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-700">
              <div className="grid gap-4 text-sm sm:grid-cols-2">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Contribution Margin:</span>
                  <span className="font-semibold text-slate-800 dark:text-white">
                    {formatCurrency(result.contributionMargin)} / unit
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Contribution Ratio:</span>
                  <span className="font-semibold text-slate-800 dark:text-white">
                    {formatPercent(result.contributionMarginRatio)}
                  </span>
                </div>
              </div>
            </div>

            {/* Simple Visualization */}
            <div>
              <p className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                Revenue vs. Cost Analysis
              </p>
              <div className="relative h-48 rounded-lg bg-slate-50 p-4 dark:bg-slate-700">
                {/* Y-axis label */}
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-slate-500">
                  EUR
                </div>

                {/* Chart area */}
                <svg className="h-full w-full" viewBox="0 0 400 150" preserveAspectRatio="none">
                  {/* Grid lines */}
                  <line x1="40" y1="10" x2="40" y2="130" stroke="#e2e8f0" strokeWidth="1" />
                  <line x1="40" y1="130" x2="390" y2="130" stroke="#e2e8f0" strokeWidth="1" />

                  {/* Fixed costs line */}
                  <line
                    x1="40"
                    y1={130 - (parseFloat(fixedCosts) / result.breakEvenRevenue) * 100}
                    x2="390"
                    y2={130 - (parseFloat(fixedCosts) / result.breakEvenRevenue) * 100}
                    stroke="#94a3b8"
                    strokeWidth="1"
                    strokeDasharray="4"
                  />

                  {/* Total Cost line */}
                  <line
                    x1="40"
                    y1={130 - (parseFloat(fixedCosts) / (result.breakEvenRevenue * 1.5)) * 100}
                    x2="390"
                    y2="10"
                    stroke="#ef4444"
                    strokeWidth="2"
                  />

                  {/* Revenue line */}
                  <line x1="40" y1="130" x2="390" y2="10" stroke="#2E6BFF" strokeWidth="2" />

                  {/* Break-even point */}
                  <circle
                    cx={40 + (result.breakEvenUnits / (result.breakEvenUnits * 1.5)) * 350}
                    cy={130 - (result.breakEvenRevenue / (result.breakEvenRevenue * 1.5)) * 120}
                    r="6"
                    fill="#22c55e"
                    stroke="white"
                    strokeWidth="2"
                  />
                </svg>

                {/* Legend */}
                <div className="absolute bottom-2 right-2 flex gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="h-0.5 w-4 bg-blue-500" />
                    <span className="text-slate-600 dark:text-slate-400">Revenue</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-0.5 w-4 bg-red-500" />
                    <span className="text-slate-600 dark:text-slate-400">Total Cost</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-slate-600 dark:text-slate-400">Break-Even</span>
                  </div>
                </div>

                {/* X-axis label */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-slate-500">
                  Units Sold
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-600">
              <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                What This Means:
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                You need to sell at least <strong>{formatNumber(result.breakEvenUnits)} units</strong> to cover all your costs.
                Each additional unit sold after that generates <strong>{formatCurrency(result.contributionMargin)}</strong> in profit.
              </p>
            </div>

            {/* CTA */}
            <div className="text-center">
              <p className="mb-3 text-sm text-slate-600 dark:text-slate-400">
                Want help optimizing your pricing and cost structure?
              </p>
              <Button as="a" href={`/${locale}#contact`}>
                Talk to Our Advisors
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
