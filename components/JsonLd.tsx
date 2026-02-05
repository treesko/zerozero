type OrganizationSchema = {
  '@context': 'https://schema.org'
  '@type': 'Organization'
  name: string
  url: string
  logo: string
  description: string
  sameAs: string[]
  contactPoint: {
    '@type': 'ContactPoint'
    contactType: string
    availableLanguage: string[]
  }
}

type LocalBusinessSchema = {
  '@context': 'https://schema.org'
  '@type': 'AccountingService'
  name: string
  url: string
  logo: string
  description: string
  priceRange: string
  address: {
    '@type': 'PostalAddress'
    addressCountry: string
  }
  areaServed: string[]
  hasOfferCatalog: {
    '@type': 'OfferCatalog'
    name: string
    itemListElement: Array<{
      '@type': 'Offer'
      itemOffered: {
        '@type': 'Service'
        name: string
        description: string
      }
    }>
  }
}

type WebSiteSchema = {
  '@context': 'https://schema.org'
  '@type': 'WebSite'
  name: string
  url: string
  description: string
  inLanguage: string[]
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://zerozero.com'

export function OrganizationJsonLd() {
  const schema: OrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'zerozero',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description:
      'zerozero is a premium accounting and advisory firm helping businesses turn numbers into clear decisions.',
    sameAs: [
      'https://www.linkedin.com/company/zerozero',
      'https://www.facebook.com/zerozero',
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

export function AccountingServiceJsonLd() {
  const schema: LocalBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'AccountingService',
    name: 'zerozero',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description:
      'Modern accounting and advisory services for SMBs, startups, and freelancers. Precision. Clarity. Confidence.',
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'XK', // Kosovo country code, update as needed
    },
    areaServed: ['Kosovo', 'Albania', 'Germany', 'Europe'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Accounting Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Bookkeeping & Accounting',
            description: 'Accurate, timely bookkeeping with streamlined workflows and expert oversight.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tax Planning & Compliance',
            description: 'Proactive planning and compliant filings to optimize your tax position.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Payroll Services',
            description: 'Reliable payroll processing with complete compliance and reporting.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Financial Reporting & Analysis',
            description: 'Clear monthly reports and insights to guide decision-making.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Startup & SME Advisory',
            description: 'From setup to scale, guidance tailored to your growth journey.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Cash Flow & Budgeting',
            description: 'Forecasting and budgeting to improve liquidity and control.',
          },
        },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebSiteJsonLd() {
  const schema: WebSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'zerozero',
    url: BASE_URL,
    description: 'Modern accounting and advisory firm. Precision. Clarity. Confidence.',
    inLanguage: ['en', 'sq', 'de'],
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
        url: `${BASE_URL}/logo.png`,
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
