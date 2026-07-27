import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#08090a' },
    { media: '(prefers-color-scheme: light)', color: '#f7f8f8' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://type-dojo.vercel.app'),
  title: {
    default: 'TypeSkill — 练出来的类型功底',
    template: '%s — TypeSkill',
  },
  description: '从 0 到精通 TypeScript 类型，190 道题逐级通关。在线 TS 类型练习平台，支持服务端编译验证、自动保存、难度分级。',
  keywords: ['TypeScript', '类型练习', '类型挑战', 'TS类型', '前端', '编程练习'],
  authors: [{ name: 'TeddyBobby' }],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: 'TypeSkill',
    title: 'TypeSkill — 练出来的类型功底',
    description: '从 0 到精通 TypeScript 类型，190 道题逐级通关。在线 TS 类型练习平台。',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TypeSkill — 练出来的类型功底',
    description: '从 0 到精通 TypeScript 类型，190 道题逐级通关。',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" data-theme="dark" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('typedojo-theme')||'dark';document.documentElement.setAttribute('data-theme',t)}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
