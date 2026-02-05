'use client'

import { useState, useMemo } from 'react'
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

function calculateIncomeTax(taxableIncome: number): number {
  let tax = 0
  let remaining = taxableIncome

  for (const bracket of TAX_BRACKETS) {
    if (remaining <= 0) break

    const taxableInBracket = Math.min(remaining, bracket.max - bracket.min)
    if (taxableInBracket > 0 && taxableIncome > bracket.min) {
      const amountInBracket = Math.min(taxableInBracket, Math.max(0, taxableIncome - bracket.min))
      tax += amountInBracket * bracket.rate
      remaining -= taxableInBracket
    }
  }

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
  title?: string
  subtitle?: string
}

export function KosovoSalaryCalculator({
  locale,
  title = 'Kosovo Salary Calculator',
  subtitle = 'Calculate your net salary from gross or vice versa',
}: KosovoSalaryCalculatorProps) {
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
    'w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white'

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-800 md:p-8">
        <div className="mb-6 text-center">
          <h3 className="mb-2 text-2xl font-bold text-primary dark:text-white">{title}</h3>
          <p className="text-slate-600 dark:text-slate-400">{subtitle}</p>
        </div>

        {!result ? (
          <div className="space-y-5">
            {/* Mode Toggle */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Calculation Mode
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setMode('gross-to-net')}
                  className={`flex-1 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                    mode === 'gross-to-net'
                      ? 'bg-accent text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  Bruto → Neto
                </button>
                <button
                  onClick={() => setMode('net-to-gross')}
                  className={`flex-1 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                    mode === 'net-to-gross'
                      ? 'bg-accent text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  Neto → Bruto
                </button>
              </div>
            </div>

            {/* Salary Input */}
            <div>
              <label htmlFor="salary" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                {mode === 'gross-to-net' ? 'Monthly Gross Salary (Bruto)' : 'Desired Net Salary (Neto)'}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">€</span>
                <input
                  id="salary"
                  type="text"
                  inputMode="numeric"
                  placeholder={mode === 'gross-to-net' ? 'e.g., 800' : 'e.g., 650'}
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className={`${inputClass} pl-8`}
                />
              </div>
            </div>

            {/* Info Box */}
            <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
              <p className="font-medium">Kosovo Tax Rates (2024):</p>
              <ul className="mt-2 space-y-1 text-xs">
                <li>• Pension Contribution: 5% (employee) + 5% (employer)</li>
                <li>• Income Tax: 0% (0-80€), 4% (80-250€), 8% (250-450€), 10% (450€+)</li>
              </ul>
            </div>

            {/* Calculate Button */}
            <Button onClick={handleCalculate} disabled={!salary} className="w-full">
              Calculate {mode === 'gross-to-net' ? 'Net Salary' : 'Gross Salary'}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Main Results */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-100 p-4 text-center dark:bg-slate-700">
                <p className="text-sm text-slate-500 dark:text-slate-400">Gross Salary (Bruto)</p>
                <p className="mt-1 text-2xl font-bold text-slate-800 dark:text-white">
                  {formatCurrency(result.grossSalary)}
                </p>
              </div>
              <div className="rounded-xl bg-accent/10 p-4 text-center dark:bg-accent/20">
                <p className="text-sm text-slate-500 dark:text-slate-400">Net Salary (Neto)</p>
                <p className="mt-1 text-2xl font-bold text-accent">
                  {formatCurrency(result.netSalary)}
                </p>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="rounded-lg border border-slate-200 dark:border-slate-600">
              <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-600 dark:bg-slate-700">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Employee Deductions
                </p>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-700">
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Gross Salary</span>
                  <span className="font-medium text-slate-800 dark:text-white">
                    {formatCurrency(result.grossSalary)}
                  </span>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Pension Contribution (5%)
                  </span>
                  <span className="font-medium text-red-600 dark:text-red-400">
                    - {formatCurrency(result.pensionEmployee)}
                  </span>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Taxable Income
                  </span>
                  <span className="font-medium text-slate-600 dark:text-slate-400">
                    {formatCurrency(result.taxableIncome)}
                  </span>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Income Tax
                  </span>
                  <span className="font-medium text-red-600 dark:text-red-400">
                    - {formatCurrency(result.incomeTax)}
                  </span>
                </div>
                <div className="flex items-center justify-between bg-accent/5 px-4 py-3 dark:bg-accent/10">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Net Salary (Neto)
                  </span>
                  <span className="text-lg font-bold text-accent">
                    {formatCurrency(result.netSalary)}
                  </span>
                </div>
              </div>
            </div>

            {/* Employer Cost */}
            <div className="rounded-lg border border-slate-200 dark:border-slate-600">
              <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-600 dark:bg-slate-700">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Employer Cost
                </p>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-700">
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Gross Salary</span>
                  <span className="font-medium text-slate-800 dark:text-white">
                    {formatCurrency(result.grossSalary)}
                  </span>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Employer Pension (5%)
                  </span>
                  <span className="font-medium text-slate-600 dark:text-slate-400">
                    + {formatCurrency(result.pensionEmployer)}
                  </span>
                </div>
                <div className="flex items-center justify-between bg-primary/5 px-4 py-3 dark:bg-primary/10">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Total Employer Cost
                  </span>
                  <span className="text-lg font-bold text-primary dark:text-white">
                    {formatCurrency(result.totalEmployerCost)}
                  </span>
                </div>
              </div>
            </div>

            {/* Annual Summary */}
            <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-700">
              <p className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                Annual Summary
              </p>
              <div className="grid gap-3 text-sm sm:grid-cols-3">
                <div>
                  <p className="text-slate-500 dark:text-slate-400">Annual Gross</p>
                  <p className="font-semibold text-slate-800 dark:text-white">
                    {formatCurrency(result.grossSalary * 12)}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500 dark:text-slate-400">Annual Net</p>
                  <p className="font-semibold text-accent">
                    {formatCurrency(result.netSalary * 12)}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500 dark:text-slate-400">Annual Employer Cost</p>
                  <p className="font-semibold text-slate-800 dark:text-white">
                    {formatCurrency(result.totalEmployerCost * 12)}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button as="a" href={`/${locale}#contact`} className="flex-1">
                Get Payroll Help
              </Button>
              <Button variant="secondary" onClick={handleReset} className="flex-1">
                Calculate Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
