export const locales = ['en', 'sq', 'de'] as const
export type Locale = typeof locales[number]
export const defaultLocale: Locale = 'sq'

import { dictionary as enDict } from './dictionaries/en'
import { dictionary as sqDict } from './dictionaries/sq'
import { dictionary as deDict } from './dictionaries/de'

export type Dict = ReturnType<typeof enDict>

export function getDictionary(locale: Locale) {
  switch (locale) {
    case 'sq':
      return sqDict()
    case 'de':
      return deDict()
    case 'en':
    default:
      return enDict()
  }
}
