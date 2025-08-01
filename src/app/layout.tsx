import '@/resources/custom.css'
import Preloader from '@/components/Preloader'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Jonathan Thota - Portfolio</title>
      </head>
      <body className="antialiased bg-white text-gray-900 overscroll-none">
        <Preloader />
                      {children}
      </body>
    </html>
  )
}
