import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'KingmarcelAPP',
  description: 'A minimal todo app built with Next.js & Supabase',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            try {
              const theme = localStorage.getItem('theme') || 'dark';
              document.documentElement.classList.toggle('dark', theme === 'dark');
            } catch {}
          `
        }} />
      </head>
      <body className="antialiased bg-slate-100 dark:bg-slate-950 transition-colors">
        {children}
      </body>
    </html>
  )
}