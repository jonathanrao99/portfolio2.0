import '@/resources/custom.css'
import Preloader from '@/components/Preloader'
import { saans, saansMono, playfairDisplay } from '@/fonts'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Jonathan Thota - Portfolio</title>
      </head>
      <body className={`antialiased bg-white text-gray-900 overscroll-none ${saans.variable} ${saansMono.variable} ${playfairDisplay.variable}`}>
        <Preloader />
                      {children}
      </body>
    </html>
  )
}
