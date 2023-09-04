import "./globals.scss"
import { Figtree } from "next/font/google"

const font = Figtree({ subsets: ["latin"] })

export const metadata = {
  title: "Musictify App",
  description: "Listen your music",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
