import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nossa IA - Assistente Inteligente',
  description: 'Uma assistente de IA de última geração pronta para ajudá-lo com qualquer coisa.',
  keywords: ['IA', 'Chat', 'Assistente', 'Inteligência Artificial'],
  authors: [{ name: 'Nossa IA' }],
  viewport: 'width=device-width, initial-scale=1.0',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://nossaia.com',
    title: 'Nossa IA - Assistente Inteligente',
    description: 'Uma assistente de IA de última geração pronta para ajudá-lo com qualquer coisa.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nossa IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nossa IA - Assistente Inteligente',
    description: 'Uma assistente de IA de última geração pronta para ajudá-lo com qualquer coisa.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="antialiased bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors duration-300">
        {children}
      </body>
    </html>
  )
}
