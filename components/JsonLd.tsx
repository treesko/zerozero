import { getDictionary } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://zerozero-ks.com'

const descriptions: Record<Locale, { org: string; service: string; site: string }> = {
  sq: {
    org: 'zerozero është firma premium e kontabilitetit dhe këshillimit financiar në Prishtinë, Kosovë. Ndihmojmë bizneset të kthejnë numrat në vendime të qarta.',
    service: 'Shërbime moderne të kontabilitetit dhe këshillimit financiar për NVM-të, startup-et dhe freelancerët në Kosovë. Saktësi. Qartësi. Besim.',
    site: 'Firma moderne e kontabilitetit dhe këshillimit financiar në Prishtinë, Kosovë. Saktësi. Qartësi. Besim.',
  },
  en: {
    org: 'zerozero is a premium accounting and advisory firm in Prishtina, Kosovo helping businesses turn numbers into clear decisions.',
    service: 'Modern accounting and advisory services for SMBs, startups, and freelancers in Kosovo. Precision. Clarity. Confidence.',
    site: 'Modern accounting and advisory firm in Prishtina, Kosovo. Precision. Clarity. Confidence.',
  },
  de: {
    org: 'zerozero ist eine Premium-Buchhaltungs- und Beratungsfirma in Prishtina, Kosovo, die Unternehmen hilft, Zahlen in klare Entscheidungen zu verwandeln.',
    service: 'Moderne Buchhaltungs- und Beratungsdienstleistungen für KMU, Startups und Freelancer im Kosovo. Präzision. Klarheit. Vertrauen.',
    site: 'Moderne Buchhaltungs- und Beratungsfirma in Prishtina, Kosovo. Präzision. Klarheit. Vertrauen.',
  },
}

export function OrganizationJsonLd({ locale }: { locale: string }) {
  const l = (locale as Locale) || 'sq'
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'zerozero',
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.svg`,
    description: descriptions[l].org,
    sameAs: [
      'https://www.facebook.com/profile.php?id=61561896255149',
      'https://www.instagram.com/zerozeroaccounting/',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'Albanian', 'German'],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function AccountingServiceJsonLd({ locale }: { locale: string }) {
  const l = (locale as Locale) || 'sq'
  const t = getDictionary(l)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AccountingService',
    name: 'zerozero',
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.svg`,
    description: descriptions[l].service,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Prishtinë',
      addressRegion: 'Kosovë',
      addressCountry: 'XK',
    },
    areaServed: [
      { '@type': 'Country', name: 'Kosovo' },
      { '@type': 'Country', name: 'Albania' },
      { '@type': 'Country', name: 'Germany' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: t.services.title,
      itemListElement: t.services.items.map((item) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: item.title,
          description: item.desc,
        },
      })),
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebSiteJsonLd({ locale }: { locale: string }) {
  const l = (locale as Locale) || 'sq'
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'zerozero',
    url: BASE_URL,
    description: descriptions[l].site,
    inLanguage: ['en', 'sq', 'de'],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

type FAQItem = { question: string; answer: string }

export function FAQPageJsonLd({ items }: { items: FAQItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

type BreadcrumbItem = { name: string; url: string }

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

type ArticleJsonLdProps = {
  title: string
  description: string
  url: string
  datePublished?: string
  dateModified?: string
}

export function ArticleJsonLd({ title, description, url, datePublished, dateModified }: ArticleJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished: datePublished || new Date().toISOString(),
    dateModified: dateModified || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: 'zerozero',
    },
    publisher: {
      '@type': 'Organization',
      name: 'zerozero',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/logo.svg`,
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
