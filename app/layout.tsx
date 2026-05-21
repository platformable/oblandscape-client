import type { Metadata } from "next"

import "./globals.css"
import Header from "@/app/components/Header"
import Providers from "@/app/providers"

export const metadata: Metadata = {
  title: "Open Banking Landscape",
  description: "Open Banking Landscape",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={``}>
      <body className="">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
