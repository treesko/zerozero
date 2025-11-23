import type { Metadata } from 'next'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'
import { getDictionary } from '@/lib/i18n'

type Props = { params: { locale: 'en'|'sq'|'de' } }

export async function generateMetadata({ params }: { params: Promise<Props['params']> }): Promise<Metadata> {
  const { locale } = await params
  const t = getDictionary(locale)
  return {
    title: `${t.privacy.title} – ${t.brand}`,
    description: t.privacy.p1,
  }
}

export default async function PrivacyPage({ params }: { params: Promise<Props['params']> }) {
  const { locale } = await params
  const t = getDictionary(locale)
  return (
    <main>
      <NavBar locale={locale} t={t} />
      <Section>
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-4xl font-extrabold text-primary">{t.privacy.title}</h1>
          <p className="text-slate-700">{t.privacy.p1}</p>
          <p className="mt-4 text-slate-700">{t.privacy.p2}</p>
        </div>
      </Section>
      <Footer locale={locale} t={t} />
    </main>
  )
}
