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
  if (hasLocale) {
    const matched = pathname.split('/')[1]
    const res = NextResponse.next()
    res.cookies.set('locale', matched, { path: '/' })
    return res
  }

  // Redirect to default locale
  const url = request.nextUrl.clone()
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`
  const res = NextResponse.redirect(url)
  res.cookies.set('locale', DEFAULT_LOCALE, { path: '/' })
  return res
}

export const config = {
  matcher: ['/((?!api|_next|.*\..*).*)'],
}
