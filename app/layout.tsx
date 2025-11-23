import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const metadata: Metadata = {
  title: 'zerozero – Modern Accounting & Advisory',
  description:
    'zerozero is a premium accounting and advisory firm helping businesses turn numbers into clear decisions. Precision. Clarity. Confidence.',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = cookies().get('locale')?.value || 'en'
  return (
    <html lang={locale} className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
