import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDictionary } from '@/lib/i18n'
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'

type Props = { params: { locale: 'en'|'sq'|'de', slug: string } }

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://zerozero-ks.com'

export function generateStaticParams() {
  const locales: Array<'en'|'sq'|'de'> = ['en','sq','de']
  return locales.flatMap(locale => {
    const t = getDictionary(locale)
    return t.resourcesData.map((r: any) => ({ locale, slug: r.slug }))
  })
}

export async function generateMetadata({ params }: { params: Promise<Props['params']> }): Promise<Metadata> {
  const { locale, slug } = await params
  const t = getDictionary(locale)
  const article = t.resourcesData.find((r: any) => r.slug === slug)
  if (!article) return { title: `Resource – ${t.brand}` }
  return {
    title: `${article.title} – ${t.brand}`,
    description: article.excerpt,
    alternates: {
      canonical: `${BASE_URL}/${locale}/resources/${slug}`,
      languages: {
        'en': `${BASE_URL}/en/resources/${slug}`,
        'sq': `${BASE_URL}/sq/resources/${slug}`,
        'de': `${BASE_URL}/de/resources/${slug}`,
        'x-default': `${BASE_URL}/sq/resources/${slug}`,
      },
    },
  }
}

export default async function ResourcePage({ params }: { params: Promise<Props['params']> }) {
  const { locale, slug } = await params
  const t = getDictionary(locale)
  const article = t.resourcesData.find((r: any) => r.slug === slug)
  if (!article) notFound()
  return (
    <main>
      <BreadcrumbJsonLd items={[
        { name: t.nav.home, url: `${BASE_URL}/${locale}` },
        { name: t.resources.title, url: `${BASE_URL}/${locale}/resources` },
        { name: article.title, url: `${BASE_URL}/${locale}/resources/${slug}` },
      ]} />
      <ArticleJsonLd
        title={article.title}
        description={article.excerpt}
        url={`${BASE_URL}/${locale}/resources/${slug}`}
      />
      <NavBar locale={locale} t={t} />
      <Section>
        <div className="mx-auto max-w-3xl">
          <Link href={`/${locale}/resources`} className="text-sm font-medium text-accent hover:underline">← {t.resources.title}</Link>
          <h1 className="mt-4 text-4xl font-extrabold text-primary dark:text-white">{article.title}</h1>
          <div className="prose prose-slate mt-6 max-w-none dark:prose-invert">
            <p>{article.content}</p>
          </div>
        </div>
      </Section>
      <Footer locale={locale} t={t} />
    </main>
  )
}
