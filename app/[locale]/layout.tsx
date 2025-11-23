export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: 'en'|'sq'|'de' }>
}) {
  await params // awaited to satisfy Next 15 typed routes API
  return children as React.ReactElement
}
