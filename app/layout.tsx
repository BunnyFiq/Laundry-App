import type React from "react"
import type { Metadata } from "next"
import { Chewy, Fredoka } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const chewy = Chewy({ weight: ["400", "500", "600", "700"], subsets: ["latin"] })
const fredoka = Fredoka({ weight: ["400", "500", "600", "700"], subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Laundry Booking App",
  description: "Book and track your laundry with ease",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${fredoka.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
