//styles
import "./globals.scss"
import { Figtree } from "next/font/google"

//components
import Sidebar from "@/components/Sidebar/Sidebar"

//libraries
import SupabaseProvider from "@/providers/SupabaseProvider"
import UserProvider from "@/providers/UserProvider"
import ModalProvider from "@/providers/ModalProvider"
import ToasterProvider from "@/providers/ToasterProvider"
import getSongsByUserId from "@/actions/getSongsByUserId"

const font = Figtree({ subsets: ["latin"] })

export const metadata = {
  title: "Musictify App",
  description: "Listen your music",
}

export const revalidate = 0

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userSongs = await getSongsByUserId()
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs}>{children}</Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
