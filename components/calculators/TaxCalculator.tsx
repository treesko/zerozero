'use client'

import { useState } from 'react'
import { Button } from '../Button'

type BusinessType = 'startup' | 'smb' | 'freelancer' | 'ecommerce' | 'professional'

type CalculatorResult = {
  currentCost: number
  zeroroCost: number
  savings: number
  savingsPercent: number
  additionalBenefits: string[]
}

type SavingsTranslations = {
  title: string
  subtitle: string
  annualRevenue: string
  revenuePlaceholder: string
  employees: string
  employeesPlaceholder: string
  businessType: string
  currentCost: string
  currentCostPlaceholder: string
  currentCostHint: string
  calculateBtn: string
  calculating: string
  annualSavings: string
  savingsPercent: string
  currentCostLabel: string
  withZerozero: string
  included: string
  recalculate: string
  cta: string
  businessTypes: Record<BusinessType, string>
  benefits: {
    fundraising: string
    runway: string
    inventory: string
    multichannel: string
    taxFiling: string
    expenses: string
    insights: string
    manager: string
  }
}

function calculateSavings(
  revenue: number,
  employees: number,
  businessType: BusinessType,
  currentCost: number,
  benefitTexts: SavingsTranslations['benefits']
): CalculatorResult {
  let zeroroCost = 149

  if (employees > 5 || revenue > 100000) {
    zeroroCost = 349
  }
  if (employees > 20 || revenue > 500000) {
    zeroroCost = 599
  }
  if (employees > 50 || revenue > 1000000) {
    zeroroCost = 999
  }

  const complexityModifiers: Record<BusinessType, number> = {
    startup: 1.0,
    smb: 1.1,
    freelancer: 0.8,
    ecommerce: 1.2,
    professional: 1.0,
  }

  zeroroCost = Math.round(zeroroCost * complexityModifiers[businessType])

  const estimatedCurrentCost = currentCost > 0 ? currentCost : zeroroCost * 1.8

  const savings = Math.max(0, estimatedCurrentCost - zeroroCost)
  const savingsPercent = estimatedCurrentCost > 0 ? Math.round((savings / estimatedCurrentCost) * 100) : 0

  const additionalBenefits: string[] = []

  if (businessType === 'startup') {
    additionalBenefits.push(benefitTexts.fundraising)
    additionalBenefits.push(benefitTexts.runway)
  } else if (businessType === 'ecommerce') {
    additionalBenefits.push(benefitTexts.inventory)
    additionalBenefits.push(benefitTexts.multichannel)
  } else if (businessType === 'freelancer') {
    additionalBenefits.push(benefitTexts.taxFiling)
    additionalBenefits.push(benefitTexts.expenses)
  }

  additionalBenefits.push(benefitTexts.insights)
  additionalBenefits.push(benefitTexts.manager)

  return {
    currentCost: estimatedCurrentCost,
    zeroroCost,
    savings,
    savingsPercent,
    additionalBenefits,
  }
}

type TaxCalculatorProps = {
  locale: string
  t: SavingsTranslations | Record<string, unknown>
}

export function TaxCalculator({ locale, t: tRaw }: TaxCalculatorProps) {
  const t = tRaw as SavingsTranslations
  const [revenue, setRevenue] = useState('')
  const [employees, setEmployees] = useState('')
  const [businessType, setBusinessType] = useState<BusinessType>('smb')
  const [currentCost, setCurrentCost] = useState('')
  const [result, setResult] = useState<CalculatorResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleCalculate = async () => {
    setIsCalculating(true)

    await new Promise((resolve) => setTimeout(resolve, 800))

    const revenueNum = parseFloat(revenue.replace(/[^0-9.]/g, '')) || 0
    const employeesNum = parseInt(employees) || 1
    const currentCostNum = parseFloat(currentCost.replace(/[^0-9.]/g, '')) || 0

    const calculationResult = calculateSavings(revenueNum, employeesNum, businessType, currentCostNum, t.benefits)
    setResult(calculationResult)
    setIsCalculating(false)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
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

        {!result ? (
          <div className="space-y-5">
            {/* Annual Revenue */}
            <div>
              <label htmlFor="revenue" className={labelClass}>
                {t.annualRevenue}
              </label>
              <input
                id="revenue"
                type="text"
                inputMode="numeric"
                placeholder={t.revenuePlaceholder}
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Number of Employees */}
            <div>
              <label htmlFor="employees" className={labelClass}>
                {t.employees}
              </label>
              <input
                id="employees"
                type="number"
                min="1"
                placeholder={t.employeesPlaceholder}
                value={employees}
                onChange={(e) => setEmployees(e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Business Type */}
            <div>
              <label htmlFor="businessType" className={labelClass}>
                {t.businessType}
              </label>
              <select
                id="businessType"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value as BusinessType)}
                className={`${inputClass} bg-white dark:bg-slate-800`}
              >
                {Object.entries(t.businessTypes).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Current Monthly Cost */}
            <div>
              <label htmlFor="currentCost" className={labelClass}>
                {t.currentCost}
              </label>
              <input
                id="currentCost"
                type="text"
                inputMode="numeric"
                placeholder={t.currentCostPlaceholder}
                value={currentCost}
                onChange={(e) => setCurrentCost(e.target.value)}
                className={inputClass}
              />
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {t.currentCostHint}
              </p>
            </div>

            {/* Calculate Button */}
            <Button
              onClick={handleCalculate}
              loading={isCalculating}
              loadingText={t.calculating}
              className="w-full"
            >
              {t.calculateBtn}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Savings Summary */}
            <div className="rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 p-6 dark:from-accent/20 dark:to-accent/10">
              <div className="mb-4 text-center">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {t.annualSavings}
                </p>
                <p className="mt-1 text-4xl font-extrabold text-accent">
                  {formatCurrency(result.savings * 12)}
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {t.savingsPercent.replace('{percent}', String(result.savingsPercent))}
                </p>
              </div>
            </div>

            {/* Comparison Chart */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">{t.currentCostLabel}</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {formatCurrency(result.currentCost)}/mo
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <div className="h-full w-full bg-slate-400 dark:bg-slate-500" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">{t.withZerozero}</span>
                <span className="font-semibold text-accent">{formatCurrency(result.zeroroCost)}/mo</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <div
                  className="h-full bg-accent transition-all duration-1000"
                  style={{ width: `${(result.zeroroCost / result.currentCost) * 100}%` }}
                />
              </div>
            </div>

            {/* Additional Benefits */}
            <div>
              <p className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                {t.included}
              </p>
              <ul className="space-y-2">
                {result.additionalBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <svg
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button as="a" href={`/${locale}#contact`} className="flex-1">
                {t.cta}
              </Button>
              <Button
                variant="secondary"
                onClick={() => setResult(null)}
                className="flex-1"
              >
                {t.recalculate}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
