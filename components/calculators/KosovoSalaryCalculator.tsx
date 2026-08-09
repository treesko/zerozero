'use client'

import { useState, useMemo } from 'react'
import { Button } from '../Button'

const PENSION_EMPLOYEE_RATE = 0.05
const PENSION_EMPLOYER_RATE = 0.05
const SECONDARY_TAX_RATE = 0.10

type CalculationMode = 'gross-to-net' | 'net-to-gross'
type EmployerType = 'primary' | 'secondary'

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
  employerType: string
  primaryEmployer: string
  secondaryEmployer: string
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
  taxRatesIncomeSecondary: string
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
  taxRatesInfo: string
  pension: string
  tax: string
  employerCostShort: string
}

function calculateIncomeTax(taxableIncome: number): number {
  let progressiveTax = 0
  if (taxableIncome > 450) {
    progressiveTax = (200 * 0.08) + ((taxableIncome - 450) * 0.10)
  } else if (taxableIncome > 250) {
    progressiveTax = (taxableIncome - 250) * 0.08
  }
  return Math.round(progressiveTax * 100) / 100
}

function calculateSecondaryIncomeTax(taxableIncome: number): number {
  return Math.round(taxableIncome * SECONDARY_TAX_RATE * 100) / 100
}

function calculateFromGross(grossSalary: number, isSecondary: boolean): SalaryBreakdown {
  const pensionEmployee = grossSalary * PENSION_EMPLOYEE_RATE
  const taxableIncome = grossSalary - pensionEmployee
  const incomeTax = isSecondary
    ? calculateSecondaryIncomeTax(taxableIncome)
    : calculateIncomeTax(taxableIncome)
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

function calculateFromNet(targetNet: number, isSecondary: boolean): SalaryBreakdown {
  let low = targetNet
  let high = targetNet * 2
  let iterations = 0
  const maxIterations = 50

  while (iterations < maxIterations) {
    const mid = (low + high) / 2
    const result = calculateFromGross(mid, isSecondary)
    if (Math.abs(result.netSalary - targetNet) < 0.01) return result
    if (result.netSalary < targetNet) low = mid
    else high = mid
    iterations++
  }
  return calculateFromGross((low + high) / 2, isSecondary)
}

type KosovoSalaryCalculatorProps = {
  locale: string
  t: SalaryTranslations | Record<string, unknown>
}

export function KosovoSalaryCalculator({ locale, t: tRaw }: KosovoSalaryCalculatorProps) {
  const t = tRaw as SalaryTranslations
  const [mode, setMode] = useState<CalculationMode>('gross-to-net')
  const [employerType, setEmployerType] = useState<EmployerType>('primary')
  const [salary, setSalary] = useState('')
  const [showTaxInfo, setShowTaxInfo] = useState(false)

  const isSecondary = employerType === 'secondary'

  const breakdown = useMemo(() => {
    const num = parseFloat(salary.replace(/[^0-9.]/g, '')) || 0
    if (num <= 0) return null
    return mode === 'gross-to-net'
      ? calculateFromGross(num, isSecondary)
      : calculateFromNet(num, isSecondary)
  }, [salary, mode, isSecondary])

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

        {/* Controls — two segments on one row */}
        <div className="mb-5 flex items-center gap-2">
          {/* Employer type segment */}
          <div className="inline-flex flex-1 rounded-full bg-primary-100 p-0.5 dark:bg-primary-800">
            <button
              onClick={() => setEmployerType('primary')}
              className={`flex-1 rounded-full px-2 py-1.5 text-sm font-semibold transition-all ${
                employerType === 'primary'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-primary-600 hover:text-primary dark:text-primary-300'
              }`}
            >
              {t.primaryEmployer}
            </button>
            <button
              onClick={() => setEmployerType('secondary')}
              className={`flex-1 rounded-full px-2 py-1.5 text-sm font-semibold transition-all ${
                employerType === 'secondary'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-primary-600 hover:text-primary dark:text-primary-300'
              }`}
            >
              {t.secondaryEmployer}
            </button>
          </div>

          {/* Mode segment */}
          <div className="inline-flex rounded-full bg-primary-100 p-0.5 dark:bg-primary-800">
            <button
              onClick={() => setMode('gross-to-net')}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-all ${
                mode === 'gross-to-net'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-primary-600 hover:text-primary dark:text-primary-300'
              }`}
            >
              {t.grossToNet}
            </button>
            <button
              onClick={() => setMode('net-to-gross')}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-all ${
                mode === 'net-to-gross'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-primary-600 hover:text-primary dark:text-primary-300'
              }`}
            >
              {t.netToGross}
            </button>
          </div>
        </div>

        {/* Salary Input */}
        <div className="relative mb-5">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-semibold text-primary-400">€</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder={mode === 'gross-to-net' ? t.grossPlaceholder : t.netPlaceholder}
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full rounded-xl border-2 border-primary-200 bg-primary-50/50 py-3.5 pl-10 pr-4 text-2xl font-bold text-primary outline-none transition-colors focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20 dark:border-primary-700 dark:bg-primary-800 dark:text-white dark:focus:bg-primary-900"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-primary-400">
            {mode === 'gross-to-net' ? t.grossInput : t.netInput}
          </span>
        </div>

        {/* Results — appear when there's a valid salary */}
        {breakdown && (
          <div className="space-y-4">
            {/* Gross / Net cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-primary-100 p-3 text-center dark:bg-primary-800">
                <p className="text-sm text-primary-500 dark:text-primary-400">{t.grossSalary}</p>
                <p className="mt-0.5 text-xl font-bold text-primary-800 dark:text-white sm:text-2xl">
                  {fmt(breakdown.grossSalary)}
                </p>
              </div>
              <div className="rounded-xl bg-accent/10 p-3 text-center dark:bg-accent/20">
                <p className="text-sm text-primary-500 dark:text-primary-400">{t.netSalary}</p>
                <p className="mt-0.5 text-xl font-bold text-accent sm:text-2xl">
                  {fmt(breakdown.netSalary)}
                </p>
              </div>
            </div>

            {/* Employee Deductions */}
            <div className="rounded-lg border border-primary-100 dark:border-primary-700">
              <div className="border-b border-primary-100 bg-primary-50 px-4 py-2.5 dark:border-primary-700 dark:bg-primary-800">
                <p className="text-sm font-semibold text-slate-700 dark:text-primary-100">{t.employeeDeductions}</p>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-700">
                <Row label={t.grossSalary} value={fmt(breakdown.grossSalary)} />
                <Row label={t.pensionContrib} value={`- ${fmt(breakdown.pensionEmployee)}`} negative />
                <Row label={t.taxableIncome} value={fmt(breakdown.taxableIncome)} muted />
                <Row label={t.incomeTax} value={`- ${fmt(breakdown.incomeTax)}`} negative />
                <div className="flex items-center justify-between bg-accent/5 px-4 py-2.5 dark:bg-accent/10">
                  <span className="text-sm font-semibold text-slate-700 dark:text-primary-100">{t.netSalary}</span>
                  <span className="text-base font-bold text-accent">{fmt(breakdown.netSalary)}</span>
                </div>
              </div>
            </div>

            {/* Employer Cost */}
            <div className="rounded-lg border border-primary-100 dark:border-primary-700">
              <div className="border-b border-primary-100 bg-primary-50 px-4 py-2.5 dark:border-primary-700 dark:bg-primary-800">
                <p className="text-sm font-semibold text-slate-700 dark:text-primary-100">{t.employerCost}</p>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-700">
                <Row label={t.grossSalary} value={fmt(breakdown.grossSalary)} />
                <Row label={t.employerPension} value={`+ ${fmt(breakdown.pensionEmployer)}`} />
                <div className="flex items-center justify-between bg-primary/5 px-4 py-2.5 dark:bg-primary/10">
                  <span className="text-sm font-semibold text-slate-700 dark:text-primary-100">{t.totalEmployerCost}</span>
                  <span className="text-base font-bold text-primary dark:text-white">{fmt(breakdown.totalEmployerCost)}</span>
                </div>
              </div>
            </div>

            {/* Annual Summary */}
            <div className="rounded-lg bg-primary-50 p-4 dark:bg-primary-800">
              <p className="mb-2 text-sm font-medium text-primary-700 dark:text-primary-200">{t.annualSummary}</p>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-primary-500 dark:text-primary-400">{t.annualGross}</p>
                  <p className="font-semibold text-primary-800 dark:text-white">{fmt(breakdown.grossSalary * 12)}</p>
                </div>
                <div>
                  <p className="text-primary-500 dark:text-primary-400">{t.annualNet}</p>
                  <p className="font-semibold text-accent">{fmt(breakdown.netSalary * 12)}</p>
                </div>
                <div>
                  <p className="text-primary-500 dark:text-primary-400">{t.annualEmployerCost}</p>
                  <p className="font-semibold text-primary-800 dark:text-white">{fmt(breakdown.totalEmployerCost * 12)}</p>
                </div>
              </div>
            </div>

            {/* Tax info toggle */}
            <div className="text-center">
              <button
                onClick={() => setShowTaxInfo(v => !v)}
                className="text-sm font-medium text-primary-500 hover:text-primary hover:underline dark:text-primary-400"
              >
                ℹ {t.taxRatesInfo}
              </button>
            </div>

            {showTaxInfo && (
              <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                <p className="font-medium">{t.taxRatesTitle}</p>
                <ul className="mt-1.5 space-y-0.5">
                  <li>• {t.taxRatesPension}</li>
                  <li>• {isSecondary ? t.taxRatesIncomeSecondary : t.taxRatesIncome}</li>
                </ul>
              </div>
            )}

            {/* CTA */}
            <Button as="a" href={`/${locale}#contact`} className="w-full">
              {t.payrollHelp}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

function Row({ label, value, negative, muted }: { label: string; value: string; negative?: boolean; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5">
      <span className="text-sm text-primary-600 dark:text-primary-300">{label}</span>
      <span className={`font-medium ${negative ? 'text-red-600 dark:text-red-400' : muted ? 'text-primary-500 dark:text-primary-400' : 'text-primary-800 dark:text-white'}`}>
        {value}
      </span>
    </div>
  )
}
