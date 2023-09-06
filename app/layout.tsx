//styles
import "./globals.scss"
import { Figtree } from "next/font/google"

//components
import Sidebar from "@/components/Sidebar/Sidebar"
import SupabaseProvider from "@/providers/SupabaseProvider"

const font = Figtree({ subsets: ["latin"] })

export const metadata = {
  title: "Musictify App",
  description: "Listen your music",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <SupabaseProvider>
          <Sidebar>{children}</Sidebar>
        </SupabaseProvider>
      </body>
    </html>
  )
}
