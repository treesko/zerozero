import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'
import { TVSHCalculator } from '@/components/calculators/TVSHCalculator'
import { RevealController } from '@/components/RevealController'
import { BackToTop } from '@/components/BackToTop'
import { getDictionary } from '@/lib/i18n'
import type { Metadata } from 'next'

type Props = { params: { locale: 'en' | 'sq' | 'de' } }

export default async function TVSHPage({ params }: { params: Promise<Props['params']> }) {
  const { locale } = await params
  const t = getDictionary(locale)

  return (
    <main>
      <NavBar locale={locale} t={t} />

      <Section container className="pt-16">
        <div className="reveal">
          <TVSHCalculator locale={locale} t={t.tvsh} />
        </div>
      </Section>

      <Footer locale={locale} t={t} />
      <BackToTop />
      <RevealController />
    </main>
  )
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://zerozero-ks.com'

export async function generateMetadata({ params }: { params: Promise<Props['params']> }): Promise<Metadata> {
  const { locale } = await params
  const t = getDictionary(locale)

  return {
    title: t.tvsh.metaTitle,
    description: t.tvsh.metaDescription,
    alternates: {
      canonical: `${BASE_URL}/${locale}/tvsh`,
      languages: {
        'en': `${BASE_URL}/en/tvsh`,
        'sq': `${BASE_URL}/sq/tvsh`,
        'de': `${BASE_URL}/de/tvsh`,
        'x-default': `${BASE_URL}/sq/tvsh`,
      },
    },
  }
}
