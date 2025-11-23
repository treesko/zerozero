export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  // Await params to satisfy Next 15 typed routes
  await params
  return children as React.ReactElement
}

