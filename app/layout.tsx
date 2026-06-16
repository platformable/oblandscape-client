import type { Metadata } from "next"

import "./globals.css"
import Header from "@/app/components/Header"
import Providers from "@/app/providers"

const siteUrl = "https://smartfinance.platformable.com"
const shareImg = `${siteUrl}/og-image.png`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Smart Finance Landscape",
    template: "%s | Smart Finance Landscape",
  },
  description: "",
  openGraph: {
    type: "website",
    siteName: "Smart Finance Landscape",
    title: "Smart Finance Landscape",
    description:
      "Discover exclusive deals and offers powered by The Smart Finance Ecosystem.",
    url: siteUrl,
    images: [
      {
        url: shareImg,
        width: 1200,
        height: 630,
        alt: "Smart Finance Landscape",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Finance Landscape",
    description:
      "Discover exclusive deals and offers powered by The Smart Finance Ecosystem.",
    images: [shareImg],
  },
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
