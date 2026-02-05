import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'
import { OrganizationJsonLd, AccountingServiceJsonLd, WebSiteJsonLd } from '@/components/JsonLd'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ToastProvider } from '@/components/Toast'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://zerozero.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'zerozero – Modern Accounting & Advisory',
    template: '%s | zerozero',
  },
  description:
    'zerozero is a premium accounting and advisory firm helping businesses turn numbers into clear decisions. Precision. Clarity. Confidence.',
  keywords: [
    'accounting',
    'bookkeeping',
    'tax planning',
    'financial advisory',
    'small business accounting',
    'payroll services',
    'financial reporting',
    'startup accounting',
    'SME accounting',
  ],
  authors: [{ name: 'zerozero' }],
  creator: 'zerozero',
  publisher: 'zerozero',
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['sq_AL', 'de_DE'],
    url: BASE_URL,
    siteName: 'zerozero',
    title: 'zerozero – Modern Accounting & Advisory',
    description:
      'zerozero is a premium accounting and advisory firm helping businesses turn numbers into clear decisions. Precision. Clarity. Confidence.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'zerozero – Precision. Clarity. Confidence.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'zerozero – Modern Accounting & Advisory',
    description:
      'Premium accounting and advisory firm helping businesses turn numbers into clear decisions.',
    images: ['/og-image.png'],
    creator: '@zerozero',
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
      'x-default': `${BASE_URL}/en`,
    },
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const store = await cookies()
  const locale = store.get('locale')?.value || 'en'
  return (
    <html lang={locale} className={inter.variable}>
      <head>
        <OrganizationJsonLd />
        <AccountingServiceJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className="bg-white text-slate-900 transition-colors dark:bg-slate-900 dark:text-slate-100">
        <ThemeProvider>
          <ToastProvider>
            <GoogleAnalytics />
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
