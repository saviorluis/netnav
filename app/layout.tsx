import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NetNav - Your AI-powered networking assistant',
  description: 'Build meaningful connections with the power of AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
