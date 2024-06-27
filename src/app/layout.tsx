import type { Metadata } from 'next'
import { Montserrat, Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import { QueryProviders } from '@/providers/QueryProvider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient } from '@tanstack/react-query'
import Template from './templete'

const NotoSans = Noto_Sans_JP({
  weight: ['300', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jp',
})
const montserrat = Montserrat({
  weight: ['300', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-en',
})

export const metadata: Metadata = {
  title: {
    default: 'portfolio_管理画面',
    template: '%s | portfolio_管理画面',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const queryClient = new QueryClient()

  return (
    <html lang="ja">
      <body
        className={`${NotoSans.variable} ${montserrat.variable} font-sm font-jp bg-background text-fc font-normal min-w-[1200px] overflow-auto`}
      >
        <QueryProviders>
          <Template>{children}</Template>
          <ReactQueryDevtools />
        </QueryProviders>
      </body>
    </html>
  )
}
