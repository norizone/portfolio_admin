import type { Metadata } from 'next'
import { M_PLUS_1, Montserrat } from 'next/font/google'
import './globals.css'
import { MainWrap } from '@/components/layouts/wrap/MainWrap'
import { QueryProviders } from '@/providers/queryProvider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const mPlus = M_PLUS_1({
  weight: ['300', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mplus',
})
const montserrat = Montserrat({
  weight: ['300', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
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
  return (
    <html lang="ja">
      <body
        className={`${mPlus.variable} ${montserrat.variable} font-sm font-jp bg-background text-fc font-normal min-w-[1200px] overflow-auto`}
      >
        <QueryProviders>
          <MainWrap>{children}</MainWrap>
          <ReactQueryDevtools />
        </QueryProviders>
      </body>
    </html>
  )
}
