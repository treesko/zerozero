import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'
import { TeamMember } from '@/components/TeamMember'
import { RevealController } from '@/components/RevealController'
import { BackToTop } from '@/components/BackToTop'
import { getDictionary } from '@/lib/i18n'
import type { Metadata } from 'next'

type Props = { params: { locale: 'en' | 'sq' | 'de' } }

export default async function TeamPage({ params }: { params: Promise<Props['params']> }) {
  const { locale } = await params
  const t = getDictionary(locale)

  return (
    <main>
      <NavBar locale={locale} t={t} />

      <Section container className="pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="reveal mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
            {t.team.badge}
          </p>
          <h1 className="reveal mb-4 text-4xl font-extrabold leading-tight text-primary dark:text-white md:text-5xl">
            {t.team.title}
          </h1>
          <p className="reveal text-lg text-primary-600 dark:text-primary-200">
            {t.team.intro}
          </p>
        </div>
      </Section>

      <Section container>
        <div className="mx-auto max-w-lg">
          {t.team.members.map((member) => (
            <TeamMember
              key={member.name}
              name={member.name}
              role={member.role}
              bio={member.bio}
              image={member.image}
              credentials={member.credentials}
              linkedin={member.linkedin}
            />
          ))}
        </div>
      </Section>

      {/* Values Section */}
      <Section container className="bg-primary-50 dark:bg-primary-900/50">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="reveal mb-3 text-3xl font-bold text-primary dark:text-white">
            {t.team.valuesTitle}
          </h2>
          <p className="reveal text-primary-600 dark:text-primary-300">
            {t.team.valuesIntro}
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {t.team.values.map((value) => (
            <div
              key={value.title}
              className="reveal rounded-xl border border-primary-100 bg-white p-6 text-center shadow-sm dark:border-primary-800 dark:bg-primary-900"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-primary dark:text-white">{value.title}</h3>
              <p className="text-sm text-primary-600 dark:text-primary-300">{value.desc}</p>
            </div>
          ))}
        </div>
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

  return {
    title: t.team.metaTitle,
    description: t.team.metaDescription,
    alternates: {
      canonical: `${BASE_URL}/${locale}/team`,
      languages: {
        'en': `${BASE_URL}/en/team`,
        'sq': `${BASE_URL}/sq/team`,
        'de': `${BASE_URL}/de/team`,
        'x-default': `${BASE_URL}/sq/team`,
      },
    },
  }
}
