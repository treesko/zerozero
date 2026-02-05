import { MetadataRoute } from 'next'
import { locales, getDictionary } from '@/lib/i18n'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://zerozero.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = []

  // Get resource slugs from English dictionary (slugs are the same across all locales)
  const enDict = getDictionary('en')
  const resourceSlugs = enDict.resourcesData.map((r) => r.slug)

  // Generate URLs for each locale
  for (const locale of locales) {
    // Home page
    routes.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE_URL}/${l}`])
        ),
      },
    })

    // Resources index page
    routes.push({
      url: `${BASE_URL}/${locale}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE_URL}/${l}/resources`])
        ),
      },
    })

    // Individual resource pages
    for (const slug of resourceSlugs) {
      routes.push({
        url: `${BASE_URL}/${locale}/resources/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}/resources/${slug}`])
          ),
        },
      })
    }

    // Privacy page
    routes.push({
      url: `${BASE_URL}/${locale}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE_URL}/${l}/privacy`])
        ),
      },
    })
  }

  return routes
}
