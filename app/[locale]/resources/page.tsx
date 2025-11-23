import type { Metadata } from 'next'
import Link from 'next/link'
import { getDictionary } from '@/lib/i18n'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'

type Props = { params: { locale: 'en'|'sq'|'de' } }

export async function generateMetadata({ params }: { params: Promise<Props['params']> }): Promise<Metadata> {
  const { locale } = await params
  const t = getDictionary(locale)
  return {
    title: `${t.resources.title} – ${t.brand}`,
    description: t.resources.intro,
  }
}

export default async function ResourcesPage({ params }: { params: Promise<Props['params']> }) {
  const { locale } = await params
  const t = getDictionary(locale)
  const list = t.resourcesData
  return (
    <main>
      <NavBar locale={locale} t={t} />
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-3 text-4xl font-extrabold text-primary">{t.resources.title}</h1>
          <p className="text-slate-600">{t.resources.intro}</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {list.map((a: any) => (
            <article key={a.slug} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-2 text-base font-semibold text-primary">
                <Link href={`/${locale}/resources/${a.slug}`} className="hover:underline">{a.title}</Link>
              </h2>
              <p className="mb-3 text-sm text-slate-600">{a.excerpt}</p>
              <Link href={`/${locale}/resources/${a.slug}`} className="text-sm font-semibold text-accent hover:underline">{t.resources.readMore}</Link>
            </article>
          ))}
        </div>
      </Section>
      <Footer locale={locale} t={t} />
    </main>
  )
}
