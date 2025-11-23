export const locales = ['en', 'sq', 'de'] as const
export type Locale = typeof locales[number]
export const defaultLocale: Locale = 'en'

export type Dict = ReturnType<typeof import('./dictionaries/en').dictionary>

export function getDictionary(locale: Locale) {
  switch (locale) {
    case 'sq':
      return require('./dictionaries/sq').dictionary()
    case 'de':
      return require('./dictionaries/de').dictionary()
    case 'en':
    default:
      return require('./dictionaries/en').dictionary()
  }
}

