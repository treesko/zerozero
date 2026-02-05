'use client'

import { useState } from 'react'
import { TaxCalculator } from './TaxCalculator'
import { HealthScoreQuiz } from './HealthScoreQuiz'
import { BreakEvenCalculator } from './BreakEvenCalculator'
import { KosovoSalaryCalculator } from './KosovoSalaryCalculator'

type Tool = 'savings' | 'health' | 'breakeven' | 'salary'

type ToolInfo = {
  id: Tool
  title: string
  description: string
  icon: React.ReactNode
}

const tools: ToolInfo[] = [
  {
    id: 'savings',
    title: 'Savings Calculator',
    description: 'See how much you could save with zerozero',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    id: 'salary',
    title: 'Salary Calculator',
    description: 'Kosovo net/gross salary conversion',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 3v4M8 3v4M12 11v6M9 14h6" />
      </svg>
    ),
  },
  {
    id: 'health',
    title: 'Health Score Quiz',
    description: 'Assess your financial health in 2 minutes',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    id: 'breakeven',
    title: 'Break-Even Calculator',
    description: 'Find your profitability threshold',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3v18h18" />
        <path d="M18 9l-5 5-4-4-3 3" />
      </svg>
    ),
  },
]

type ToolsSectionProps = {
  locale: string
  title?: string
  subtitle?: string
}

export function ToolsSection({
  locale,
  title = 'Free Financial Tools',
  subtitle = 'Use our interactive calculators to get instant insights into your business finances',
}: ToolsSectionProps) {
  const [activeTool, setActiveTool] = useState<Tool>('savings')

  return (
    <div>
      <div className="mx-auto mb-8 max-w-3xl text-center">
        <h2 className="reveal mb-3 text-3xl font-bold text-primary dark:text-white">{title}</h2>
        <p className="reveal text-slate-600 dark:text-slate-400">{subtitle}</p>
      </div>

      {/* Tool Selector Tabs */}
      <div className="reveal mb-8 flex flex-wrap justify-center gap-3">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all ${
              activeTool === tool.id
                ? 'bg-accent text-white shadow-lg'
                : 'bg-white text-slate-700 shadow-sm hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {tool.icon}
            <span className="hidden sm:inline">{tool.title}</span>
          </button>
        ))}
      </div>

      {/* Tool Description */}
      <p className="reveal mb-6 text-center text-sm text-slate-500 dark:text-slate-400">
        {tools.find((t) => t.id === activeTool)?.description}
      </p>

      {/* Active Tool */}
      <div className="reveal">
        {activeTool === 'savings' && <TaxCalculator locale={locale} />}
        {activeTool === 'salary' && <KosovoSalaryCalculator locale={locale} />}
        {activeTool === 'health' && <HealthScoreQuiz locale={locale} />}
        {activeTool === 'breakeven' && <BreakEvenCalculator locale={locale} />}
      </div>
    </div>
  )
}
