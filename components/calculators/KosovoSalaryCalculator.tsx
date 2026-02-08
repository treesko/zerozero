'use client'

import { useState } from 'react'
import { Button } from '../Button'

// Kosovo tax and contribution rates (2024)
const PENSION_EMPLOYEE_RATE = 0.05 // 5%
const PENSION_EMPLOYER_RATE = 0.05 // 5%

// Progressive income tax brackets (monthly)
const TAX_BRACKETS = [
  { min: 0, max: 80, rate: 0 },        // 0-80 EUR: 0%
  { min: 80, max: 250, rate: 0.04 },   // 80-250 EUR: 4%
  { min: 250, max: 450, rate: 0.08 },  // 250-450 EUR: 8%
  { min: 450, max: Infinity, rate: 0.10 }, // Above 450: 10%
]

type CalculationMode = 'gross-to-net' | 'net-to-gross'

type SalaryBreakdown = {
  grossSalary: number
  pensionEmployee: number
  taxableIncome: number
  incomeTax: number
  netSalary: number
  pensionEmployer: number
  totalEmployerCost: number
}

type SalaryTranslations = {
  title: string
  subtitle: string
  mode: string
  grossToNet: string
  netToGross: string
  grossInput: string
  netInput: string
  grossPlaceholder: string
  netPlaceholder: string
  taxRatesTitle: string
  taxRatesPension: string
  taxRatesIncome: string
  calculateNet: string
  calculateGross: string
  grossSalary: string
  netSalary: string
  employeeDeductions: string
  pensionContrib: string
  taxableIncome: string
  incomeTax: string
  employerCost: string
  employerPension: string
  totalEmployerCost: string
  annualSummary: string
  annualGross: string
  annualNet: string
  annualEmployerCost: string
  payrollHelp: string
  calculateAgain: string
}

function calculateIncomeTax(taxableIncome: number): number {
  // Simplified progressive calculation
  let progressiveTax = 0
  if (taxableIncome > 450) {
    progressiveTax = (80 * 0) + (170 * 0.04) + (200 * 0.08) + ((taxableIncome - 450) * 0.10)
  } else if (taxableIncome > 250) {
    progressiveTax = (80 * 0) + (170 * 0.04) + ((taxableIncome - 250) * 0.08)
  } else if (taxableIncome > 80) {
    progressiveTax = (80 * 0) + ((taxableIncome - 80) * 0.04)
  } else {
    progressiveTax = 0
  }

  return Math.round(progressiveTax * 100) / 100
}

function calculateFromGross(grossSalary: number): SalaryBreakdown {
  const pensionEmployee = grossSalary * PENSION_EMPLOYEE_RATE
  const taxableIncome = grossSalary - pensionEmployee
  const incomeTax = calculateIncomeTax(taxableIncome)
  const netSalary = grossSalary - pensionEmployee - incomeTax
  const pensionEmployer = grossSalary * PENSION_EMPLOYER_RATE
  const totalEmployerCost = grossSalary + pensionEmployer

  return {
    grossSalary: Math.round(grossSalary * 100) / 100,
    pensionEmployee: Math.round(pensionEmployee * 100) / 100,
    taxableIncome: Math.round(taxableIncome * 100) / 100,
    incomeTax: Math.round(incomeTax * 100) / 100,
    netSalary: Math.round(netSalary * 100) / 100,
    pensionEmployer: Math.round(pensionEmployer * 100) / 100,
    totalEmployerCost: Math.round(totalEmployerCost * 100) / 100,
  }
}

function calculateFromNet(targetNet: number): SalaryBreakdown {
  // Binary search to find gross salary that results in target net
  let low = targetNet
  let high = targetNet * 2
  let iterations = 0
  const maxIterations = 50

  while (iterations < maxIterations) {
    const mid = (low + high) / 2
    const result = calculateFromGross(mid)

    if (Math.abs(result.netSalary - targetNet) < 0.01) {
      return result
    }

    if (result.netSalary < targetNet) {
      low = mid
    } else {
      high = mid
    }
    iterations++
  }

  return calculateFromGross((low + high) / 2)
}

type KosovoSalaryCalculatorProps = {
  locale: string
  t: SalaryTranslations | Record<string, unknown>
}

export function KosovoSalaryCalculator({ locale, t: tRaw }: KosovoSalaryCalculatorProps) {
  const t = tRaw as SalaryTranslations
  const [mode, setMode] = useState<CalculationMode>('gross-to-net')
  const [salary, setSalary] = useState('')
  const [result, setResult] = useState<SalaryBreakdown | null>(null)

  const handleCalculate = () => {
    const salaryNum = parseFloat(salary.replace(/[^0-9.]/g, '')) || 0
    if (salaryNum <= 0) return

    if (mode === 'gross-to-net') {
      setResult(calculateFromGross(salaryNum))
    } else {
      setResult(calculateFromNet(salaryNum))
    }
  }

  const handleReset = () => {
    setResult(null)
    setSalary('')
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const inputClass =
    'w-full rounded-md border border-primary-200 px-4 py-3.5 text-base outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-primary-700 dark:bg-primary-900 dark:text-white'

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl border border-primary-100 bg-white p-4 shadow-lg sm:p-6 dark:border-primary-800 dark:bg-primary-900 lg:p-8">
        <div className="mb-6 text-center">
          <h3 className="mb-2 text-2xl font-bold text-primary dark:text-white">{t.title}</h3>
          <p className="text-primary-600 dark:text-primary-300">{t.subtitle}</p>
        </div>

        {!result ? (
          <div className="space-y-5">
            {/* Mode Toggle */}
            <div>
              <label className="mb-2 block text-sm font-medium text-primary-700 dark:text-primary-200">
                {t.mode}
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setMode('gross-to-net')}
                  className={`flex-1 rounded-lg px-4 py-3.5 text-base font-medium transition-all ${
                    mode === 'gross-to-net'
                      ? 'bg-accent text-white'
                      : 'bg-primary-100 text-slate-700 hover:bg-primary-200 dark:bg-primary-800 dark:text-primary-200'
                  }`}
                >
                  {t.grossToNet}
                </button>
                <button
                  onClick={() => setMode('net-to-gross')}
                  className={`flex-1 rounded-lg px-4 py-3.5 text-base font-medium transition-all ${
                    mode === 'net-to-gross'
                      ? 'bg-accent text-white'
                      : 'bg-primary-100 text-slate-700 hover:bg-primary-200 dark:bg-primary-800 dark:text-primary-200'
                  }`}
                >
                  {t.netToGross}
                </button>
              </div>
            </div>

            {/* Salary Input */}
            <div>
              <label htmlFor="salary" className="mb-1.5 block text-sm font-medium text-primary-700 dark:text-primary-200">
                {mode === 'gross-to-net' ? t.grossInput : t.netInput}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400">€</span>
                <input
                  id="salary"
                  type="text"
                  inputMode="numeric"
                  placeholder={mode === 'gross-to-net' ? t.grossPlaceholder : t.netPlaceholder}
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className={`${inputClass} pl-8`}
                />
              </div>
            </div>

            {/* Info Box */}
            <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
              <p className="font-medium">{t.taxRatesTitle}</p>
              <ul className="mt-2 space-y-1 text-xs">
                <li>• {t.taxRatesPension}</li>
                <li>• {t.taxRatesIncome}</li>
              </ul>
            </div>

            {/* Calculate Button */}
            <Button onClick={handleCalculate} disabled={!salary} className="w-full">
              {mode === 'gross-to-net' ? t.calculateNet : t.calculateGross}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Main Results */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-primary-100 p-4 text-center dark:bg-primary-800">
                <p className="text-sm text-primary-500 dark:text-primary-400">{t.grossSalary}</p>
                <p className="mt-1 text-2xl font-bold text-primary-800 dark:text-white">
                  {formatCurrency(result.grossSalary)}
                </p>
              </div>
              <div className="rounded-xl bg-accent/10 p-4 text-center dark:bg-accent/20">
                <p className="text-sm text-primary-500 dark:text-primary-400">{t.netSalary}</p>
                <p className="mt-1 text-2xl font-bold text-accent">
                  {formatCurrency(result.netSalary)}
                </p>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="rounded-lg border border-primary-100 dark:border-primary-700">
              <div className="border-b border-primary-100 bg-primary-50 px-4 py-3 dark:border-primary-700 dark:bg-primary-800">
                <p className="text-sm font-semibold text-slate-700 dark:text-primary-100">
                  {t.employeeDeductions}
                </p>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-700">
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-primary-600 dark:text-primary-300">{t.grossSalary}</span>
                  <span className="font-medium text-primary-800 dark:text-white">
                    {formatCurrency(result.grossSalary)}
                  </span>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-primary-600 dark:text-primary-300">
                    {t.pensionContrib}
                  </span>
                  <span className="font-medium text-red-600 dark:text-red-400">
                    - {formatCurrency(result.pensionEmployee)}
                  </span>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-primary-600 dark:text-primary-300">
                    {t.taxableIncome}
                  </span>
                  <span className="font-medium text-primary-600 dark:text-primary-300">
                    {formatCurrency(result.taxableIncome)}
                  </span>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-primary-600 dark:text-primary-300">
                    {t.incomeTax}
                  </span>
                  <span className="font-medium text-red-600 dark:text-red-400">
                    - {formatCurrency(result.incomeTax)}
                  </span>
                </div>
                <div className="flex items-center justify-between bg-accent/5 px-4 py-3 dark:bg-accent/10">
                  <span className="text-sm font-semibold text-slate-700 dark:text-primary-100">
                    {t.netSalary}
                  </span>
                  <span className="text-lg font-bold text-accent">
                    {formatCurrency(result.netSalary)}
                  </span>
                </div>
              </div>
            </div>

            {/* Employer Cost */}
            <div className="rounded-lg border border-primary-100 dark:border-primary-700">
              <div className="border-b border-primary-100 bg-primary-50 px-4 py-3 dark:border-primary-700 dark:bg-primary-800">
                <p className="text-sm font-semibold text-slate-700 dark:text-primary-100">
                  {t.employerCost}
                </p>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-700">
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-primary-600 dark:text-primary-300">{t.grossSalary}</span>
                  <span className="font-medium text-primary-800 dark:text-white">
                    {formatCurrency(result.grossSalary)}
                  </span>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-primary-600 dark:text-primary-300">
                    {t.employerPension}
                  </span>
                  <span className="font-medium text-primary-600 dark:text-primary-300">
                    + {formatCurrency(result.pensionEmployer)}
                  </span>
                </div>
                <div className="flex items-center justify-between bg-primary/5 px-4 py-3 dark:bg-primary/10">
                  <span className="text-sm font-semibold text-slate-700 dark:text-primary-100">
                    {t.totalEmployerCost}
                  </span>
                  <span className="text-lg font-bold text-primary dark:text-white">
                    {formatCurrency(result.totalEmployerCost)}
                  </span>
                </div>
              </div>
            </div>

            {/* Annual Summary */}
            <div className="rounded-lg bg-primary-50 p-4 dark:bg-primary-800">
              <p className="mb-3 text-sm font-medium text-primary-700 dark:text-primary-200">
                {t.annualSummary}
              </p>
              <div className="grid gap-3 text-sm sm:grid-cols-3">
                <div>
                  <p className="text-primary-500 dark:text-primary-400">{t.annualGross}</p>
                  <p className="font-semibold text-primary-800 dark:text-white">
                    {formatCurrency(result.grossSalary * 12)}
                  </p>
                </div>
                <div>
                  <p className="text-primary-500 dark:text-primary-400">{t.annualNet}</p>
                  <p className="font-semibold text-accent">
                    {formatCurrency(result.netSalary * 12)}
                  </p>
                </div>
                <div>
                  <p className="text-primary-500 dark:text-primary-400">{t.annualEmployerCost}</p>
                  <p className="font-semibold text-primary-800 dark:text-white">
                    {formatCurrency(result.totalEmployerCost * 12)}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button as="a" href={`/${locale}#contact`} className="flex-1">
                {t.payrollHelp}
              </Button>
              <Button variant="secondary" onClick={handleReset} className="flex-1">
                {t.calculateAgain}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
