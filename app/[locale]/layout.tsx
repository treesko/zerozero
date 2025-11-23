import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: 'en'|'sq'|'de' }
}) {
  return (
    <html lang={params.locale} className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}

