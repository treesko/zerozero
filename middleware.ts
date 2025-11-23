import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'sq', 'de']
const DEFAULT_LOCALE = 'en'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  // Ignore next internals and public files
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('.') // files like /favicon.ico
  ) {
    return
  }

  // If path already has a locale, continue
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))
  if (hasLocale) return

  // Redirect to default locale
  const url = request.nextUrl.clone()
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!api|_next|.*\..*).*)'],
}

