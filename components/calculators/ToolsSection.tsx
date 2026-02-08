'use client'

import { useState } from 'react'
import { TaxCalculator } from './TaxCalculator'
import { HealthScoreQuiz } from './HealthScoreQuiz'
import { BreakEvenCalculator } from './BreakEvenCalculator'
import { KosovoSalaryCalculator } from './KosovoSalaryCalculator'

type Tool = 'savings' | 'health' | 'breakeven' | 'salary'

type ToolsTranslations = {
  sectionTitle: string
  sectionSubtitle: string
  savings: Record<string, unknown>
  salary: Record<string, unknown>
  health: Record<string, unknown>
  breakeven: Record<string, unknown>
}

type ToolsSectionProps = {
  locale: string
  t: ToolsTranslations
}

export function ToolsSection({ locale, t }: ToolsSectionProps) {
  const [activeTool, setActiveTool] = useState<Tool>('savings')

  const tools = [
    {
      id: 'savings' as Tool,
      title: (t.savings as { tabTitle: string }).tabTitle,
      description: (t.savings as { tabDescription: string }).tabDescription,
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      id: 'salary' as Tool,
      title: (t.salary as { tabTitle: string }).tabTitle,
      description: (t.salary as { tabDescription: string }).tabDescription,
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 3v4M8 3v4M12 11v6M9 14h6" />
        </svg>
      ),
    },
    {
      id: 'health' as Tool,
      title: (t.health as { tabTitle: string }).tabTitle,
      description: (t.health as { tabDescription: string }).tabDescription,
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
    },
    {
      id: 'breakeven' as Tool,
      title: (t.breakeven as { tabTitle: string }).tabTitle,
      description: (t.breakeven as { tabDescription: string }).tabDescription,
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3v18h18" />
          <path d="M18 9l-5 5-4-4-3 3" />
        </svg>
      ),
    },
  ]

  return (
    <div>
      <div className="mx-auto mb-8 max-w-3xl text-center">
        <h2 className="reveal mb-3 text-3xl font-bold text-primary dark:text-white">{t.sectionTitle}</h2>
        <p className="reveal text-primary-600 dark:text-primary-300">{t.sectionSubtitle}</p>
      </div>

      {/* Tool Selector Tabs */}
      <div className="reveal mb-8 flex flex-wrap justify-center gap-3">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className={`flex items-center gap-2 rounded-full px-5 py-3.5 text-base font-medium transition-all ${
              activeTool === tool.id
                ? 'bg-accent text-white shadow-lg'
                : 'bg-white text-primary-700 shadow-sm hover:bg-primary-50 dark:bg-primary-900 dark:text-primary-200 dark:hover:bg-primary-800'
            }`}
          >
            {tool.icon}
            <span className="hidden sm:inline">{tool.title}</span>
          </button>
        ))}
      </div>

      {/* Tool Description */}
      <p className="reveal mb-6 text-center text-sm text-primary-500 dark:text-primary-400">
        {tools.find((tool) => tool.id === activeTool)?.description}
      </p>

      {/* Active Tool */}
      <div className="reveal">
        {activeTool === 'savings' && <TaxCalculator locale={locale} t={t.savings} />}
        {activeTool === 'salary' && <KosovoSalaryCalculator locale={locale} t={t.salary} />}
        {activeTool === 'health' && <HealthScoreQuiz locale={locale} t={t.health} />}
        {activeTool === 'breakeven' && <BreakEvenCalculator locale={locale} t={t.breakeven} />}
      </div>
    </div>
  )
}
