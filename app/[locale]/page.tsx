import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'
import { Button } from '@/components/Button'
import { ServiceCard } from '@/components/cards/ServiceCard'
import { TestimonialCard } from '@/components/cards/TestimonialCard'
import { PricingCard } from '@/components/cards/PricingCard'
import { ContactForm } from '@/components/ContactForm'
import { RevealController } from '@/components/RevealController'
import { BackToTop } from '@/components/BackToTop'
import { ToolsSection } from '@/components/calculators/ToolsSection'
import { getDictionary } from '@/lib/i18n'
import type { Metadata } from 'next'

type Props = { params: { locale: 'en' | 'sq' | 'de' } }

function HeroGraphic() {
  return (
    <div className="relative h-72 w-full overflow-hidden rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 shadow-sm dark:from-primary-900 dark:to-primary-950 md:h-full">
      <svg className="absolute -left-6 -top-6 h-40 w-40 text-accent/30 dark:text-accent/40" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="2"/>
      </svg>
      <svg className="absolute bottom-6 right-6 h-28 w-28 text-primary/20 dark:text-accent/30" viewBox="0 0 100 100" fill="none">
        <rect x="10" y="10" width="80" height="80" rx="10" stroke="currentColor" strokeWidth="2"/>
      </svg>
      <div className="absolute inset-6">
        <div className="grid h-full grid-rows-3 gap-3">
          <div className="rounded-md bg-white/80 p-4 shadow-sm dark:bg-primary-800/70">
            <div className="h-2 w-1/3 rounded bg-accent/70"></div>
            <div className="mt-3 flex items-end gap-2">
              {[30, 50, 80, 45, 90].map((h, i) => (
                <div key={i} className="w-5 rounded bg-primary-300 dark:bg-accent/50" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="rounded-md bg-white/80 p-4 shadow-sm dark:bg-primary-800/70">
            <div className="h-2 w-24 rounded bg-primary-200 dark:bg-primary-600"></div>
            <div className="mt-3 h-1.5 w-full rounded bg-accent/40 dark:bg-accent/50"></div>
            <div className="mt-2 h-1.5 w-2/3 rounded bg-primary-300 dark:bg-primary-500"></div>
          </div>
          <div className="rounded-md bg-white/80 p-4 shadow-sm dark:bg-primary-800/70">
            <div className="flex items-center justify-between">
              <div className="h-2 w-28 rounded bg-primary-200 dark:bg-primary-600"></div>
              <div className="h-6 w-16 rounded bg-accent/50 dark:bg-accent/60"></div>
            </div>
            <div className="mt-3 h-1.5 w-4/5 rounded bg-primary-200 dark:bg-primary-500"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default async function Page({ params }: { params: Promise<Props['params']> }) {
  const { locale } = await params
  const t = getDictionary(locale)
  return (
    <main id="home">
      <NavBar locale={locale} t={t} />

      {/* Hero */}
      <Section container className="pt-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="reveal">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">{t.hero.badge}</p>
            <h1 className="mb-4 text-4xl font-extrabold leading-tight text-primary dark:text-white md:text-5xl">{t.hero.title}</h1>
            <p className="mb-8 max-w-xl text-lg text-primary-600 dark:text-primary-200">{t.hero.subtitle}</p>
            <div className="flex flex-wrap gap-3">
              <Button as="a" href={`/${locale}#contact`}>{t.hero.primaryCta}</Button>
              <Button as="a" href={`/${locale}#services`} variant="secondary">{t.hero.secondaryCta}</Button>
            </div>
          </div>
          <div className="reveal">
            <HeroGraphic />
          </div>
        </div>
      </Section>

      {/* Trust / Stats Strip */}
      <Section container className="py-8">
        <div className="reveal grid grid-cols-2 gap-6 rounded-xl border border-primary-100 bg-white p-6 text-sm shadow-sm dark:border-primary-800 dark:bg-primary-900 md:grid-cols-4">
          {t.stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-xl font-extrabold text-primary dark:text-white">{s.value}</div>
              <div className="mt-1 text-primary-600 dark:text-primary-300">{s.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Services */}
      <Section id="services">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="reveal mb-3 text-3xl font-bold text-primary dark:text-white">{t.services.title}</h2>
          <p className="reveal text-primary-600 dark:text-primary-300">{t.services.intro}</p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((s) => (
            <ServiceCard key={s.title} title={s.title} description={s.desc} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v14H3z"/><path d="M3 7h18"/><path d="M7 21h10"/></svg>} />
          ))}
        </div>
      </Section>

      {/* About */}
      <Section id="about">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="reveal">
            <h2 className="mb-4 text-3xl font-bold text-primary dark:text-white">{t.about.title}</h2>
            <p className="mb-4 text-primary-700 dark:text-primary-200">{t.about.p1}</p>
            <p className="text-primary-700 dark:text-primary-200">{t.about.p2}</p>
          </div>
          <div className="reveal">
            <ul className="space-y-3">
              {t.about.bullets.map((item) => (
                <li key={item} className="flex items-start gap-3 text-primary-700 dark:text-primary-200">
                  <svg className="mt-1 text-accent" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Industries */}
      <Section id="industries">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="reveal mb-3 text-3xl font-bold text-primary dark:text-white">{t.industries.title}</h2>
          <p className="reveal text-primary-600 dark:text-primary-300">{t.industries.intro}</p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {t.industries.items.map((c) => (
            <div key={c.t} className="reveal rounded-full border border-primary-100 bg-white px-5 py-3 text-sm shadow-sm dark:border-primary-800 dark:bg-primary-900">
              <div className="font-semibold text-primary dark:text-white">{c.t}</div>
              <div className="text-primary-600 dark:text-primary-300">{c.d}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Interactive Tools */}
      <Section id="tools" className="bg-primary-50 dark:bg-primary-900/50">
        <ToolsSection locale={locale} t={t.tools} />
      </Section>

      {/* Testimonials */}
      <Section id="testimonials">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="reveal mb-3 text-3xl font-bold text-primary dark:text-white">{t.testimonials.title}</h2>
          <p className="reveal text-primary-600 dark:text-primary-300">{t.testimonials.intro}</p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {t.testimonials.items.map((item) => (
            <TestimonialCard key={item.quote} quote={item.quote} name={item.name} role={item.role} />
          ))}
        </div>
      </Section>

      {/* Resources */}
      <Section id="resources">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="reveal mb-3 text-3xl font-bold text-primary dark:text-white">{t.resources.title}</h2>
          <p className="reveal text-primary-600 dark:text-primary-300">{t.resources.intro}</p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {t.resourcesData.slice(0, 3).map((a) => (
            <article key={a.slug} className="reveal rounded-xl border border-primary-100 bg-white p-6 shadow-sm dark:border-primary-800 dark:bg-primary-900">
              <h3 className="mb-2 text-base font-semibold text-primary dark:text-white">{a.title}</h3>
              <p className="mb-3 text-sm text-primary-600 dark:text-primary-300">{a.excerpt}</p>
              <a href={`/${locale}/resources/${a.slug}`} className="text-sm font-semibold text-accent hover:underline">{t.resources.readMore}</a>
            </article>
          ))}
        </div>
        <div className="reveal mx-auto mt-8 max-w-3xl text-center">
          <a href={`/${locale}/resources`} className="text-sm font-semibold text-accent hover:underline">{t.resources.exploreAll}</a>
        </div>
      </Section>

      {/* Pricing */}
      <Section id="pricing">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="reveal mb-3 text-3xl font-bold text-primary dark:text-white">{t.pricing.title}</h2>
          <p className="reveal text-primary-600 dark:text-primary-300">{t.pricing.intro}</p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {t.pricing.plans.map((p) => (
            <PricingCard key={p.name} name={p.name} price={p.price} description={p.desc} features={p.features} highlighted={p.highlighted} mostPopularText={t.pricing.mostPopular} />
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="reveal mb-3 text-3xl font-bold text-primary dark:text-white">{t.contact.title}</h2>
          <p className="reveal text-primary-600 dark:text-primary-300">{t.contact.intro}</p>
        </div>
        <ContactForm t={t} />
      </Section>

      <Footer locale={locale} t={t} />
      <BackToTop />
      <RevealController />
    </main>
  )
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://zerozero.com'

export async function generateMetadata({ params }: { params: Promise<Props['params']> }): Promise<Metadata> {
  const { locale } = await params
  const t = getDictionary(locale)

  const localeToOg: Record<string, string> = {
    en: 'en_US',
    sq: 'sq_AL',
    de: 'de_DE',
  }

  return {
    title: `${t.brand} – Modern Accounting & Advisory`,
    description: `${t.hero.subtitle}`,
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        'en': `${BASE_URL}/en`,
        'sq': `${BASE_URL}/sq`,
        'de': `${BASE_URL}/de`,
        'x-default': `${BASE_URL}/en`,
      },
    },
    openGraph: {
      title: `${t.brand} – ${t.hero.title}`,
      description: t.hero.subtitle,
      url: `${BASE_URL}/${locale}`,
      locale: localeToOg[locale] || 'en_US',
      alternateLocale: Object.entries(localeToOg)
        .filter(([l]) => l !== locale)
        .map(([, og]) => og),
    },
  }
}
