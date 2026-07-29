'use client'

import { KosovoSalaryCalculator } from './KosovoSalaryCalculator'

type ToolsTranslations = {
  sectionTitle: string
  sectionSubtitle: string
  salary: Record<string, unknown>
}

type ToolsSectionProps = {
  locale: string
  t: ToolsTranslations
}

export function ToolsSection({ locale, t }: ToolsSectionProps) {
  return (
    <div>
      <div className="mx-auto mb-8 max-w-3xl text-center">
        <h2 className="reveal mb-3 text-3xl font-bold text-primary dark:text-white">{t.sectionTitle}</h2>
        <p className="reveal text-primary-600 dark:text-primary-300">{t.sectionSubtitle}</p>
      </div>

      <div className="reveal">
        <KosovoSalaryCalculator locale={locale} t={t.salary} />
      </div>
    </div>
  )
}
