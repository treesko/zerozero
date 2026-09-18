import type { Metadata } from 'next'
import './globals.css'
import { Poppins } from 'next/font/google'
import { cookies } from 'next/headers'
import { OrganizationJsonLd, AccountingServiceJsonLd, WebSiteJsonLd } from '@/components/JsonLd'
import type { Locale } from '@/lib/i18n'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ToastProvider } from '@/components/Toast'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap'
})

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://zerozero-ks.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'zerozero – Kontabilitet & Këshillim Financiar në Kosovë',
    template: '%s | zerozero',
  },
  description:
    'zerozero është firma premium e kontabilitetit dhe këshillimit financiar në Prishtinë, Kosovë. Ndihmojmë bizneset të kthejnë numrat në vendime të qarta. Saktësi. Qartësi. Besim.',
  keywords: [
    'kontabilitet', 'kontabilist Prishtinë', 'kontabilist Kosovë',
    'mbajtje e librave', 'planifikim tatimor', 'këshillim financiar',
    'pagat Kosovë', 'TVSH Kosovë', 'ATK', 'deklarim tatimor',
    'raportim financiar', 'biznese të vogla Kosovë', 'startup Kosovë',
    'llogaritës i pagës', 'kalkulatori i TVSH', 'kontabilitet Prishtinë',
    'shërbime kontabiliteti', 'kontabilist', 'tatimi mbi të ardhurat',
  ],
  authors: [{ name: 'zerozero' }],
  creator: 'zerozero',
  publisher: 'zerozero',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/images/logo-mark.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'sq_AL',
    alternateLocale: ['en_US', 'de_DE'],
    url: BASE_URL,
    siteName: 'zerozero',
    title: 'zerozero – Kontabilitet & Këshillim Financiar në Kosovë',
    description:
      'zerozero është firma premium e kontabilitetit dhe këshillimit financiar në Prishtinë, Kosovë. Saktësi. Qartësi. Besim.',
    images: [
      {
        url: '/api/og?locale=sq',
        width: 1200,
        height: 630,
        alt: 'zerozero – Saktësi. Qartësi. Besim.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'zerozero – Kontabilitet & Këshillim Financiar',
    description:
      'Firma premium e kontabilitetit dhe këshillimit financiar në Prishtinë, Kosovë. Saktësi. Qartësi. Besim.',
    images: ['/api/og?locale=sq'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      'en': `${BASE_URL}/en`,
      'sq': `${BASE_URL}/sq`,
      'de': `${BASE_URL}/de`,
      'x-default': `${BASE_URL}/sq`,
    },
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const store = await cookies()
  const locale = store.get('locale')?.value || 'sq'
  return (
    <html lang={locale} className={poppins.variable}>
      <head>
        <OrganizationJsonLd locale={locale} />
        <AccountingServiceJsonLd locale={locale} />
        <WebSiteJsonLd locale={locale} />
      </head>
      <body className="font-sans">
        <ThemeProvider defaultTheme="light">
          <ToastProvider>
            <GoogleAnalytics />
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
