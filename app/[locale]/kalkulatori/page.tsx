import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'
import { KosovoSalaryCalculator } from '@/components/calculators/KosovoSalaryCalculator'
import { RevealController } from '@/components/RevealController'
import { BackToTop } from '@/components/BackToTop'
import { BreadcrumbJsonLd } from '@/components/JsonLd'
import { getDictionary } from '@/lib/i18n'
import type { Metadata } from 'next'

type Props = { params: { locale: 'en' | 'sq' | 'de' } }

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://zerozero-ks.com'

export default async function CalculatorPage({ params }: { params: Promise<Props['params']> }) {
  const { locale } = await params
  const t = getDictionary(locale)

  return (
    <main>
      <BreadcrumbJsonLd items={[
        { name: t.nav.home, url: `${BASE_URL}/${locale}` },
        { name: t.calculator.metaTitle.split(' | ')[0], url: `${BASE_URL}/${locale}/kalkulatori` },
      ]} />
      <NavBar locale={locale} t={t} />

      <Section container className="pt-16">
        <div className="reveal">
          <KosovoSalaryCalculator locale={locale} t={t.tools.salary} />
        </div>
      </Section>

      <Footer locale={locale} t={t} />
      <BackToTop />
      <RevealController />
    </main>
  )
}

export async function generateMetadata({ params }: { params: Promise<Props['params']> }): Promise<Metadata> {
  const { locale } = await params
  const t = getDictionary(locale)

  return {
    title: t.calculator.metaTitle,
    description: t.calculator.metaDescription,
    keywords: t.calculator.metaKeywords,
    alternates: {
      canonical: `${BASE_URL}/${locale}/kalkulatori`,
      languages: {
        'en': `${BASE_URL}/en/kalkulatori`,
        'sq': `${BASE_URL}/sq/kalkulatori`,
        'de': `${BASE_URL}/de/kalkulatori`,
        'x-default': `${BASE_URL}/sq/kalkulatori`,
      },
    },
  }
}
