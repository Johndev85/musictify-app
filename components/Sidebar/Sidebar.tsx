"use client" //dinamic component

//styles
import styles from "./sidebar.module.scss"

//types
import { Song } from "@/types"

//libraries
import { usePathname } from "next/navigation"
import { useMemo } from "react"
import { HiHome } from "react-icons/hi"
import { BiSearch } from "react-icons/bi"

//components
import Box from "../Box/Box"
import SidebarItem from "../SidebarItem/SidebarItem"
import Library from "../Library/Library"

//hooks
import usePlayer from "@/hooks/usePlayer"

//typescript props definitions
interface SidebarProps {
  children: React.ReactNode
  songs: Song[]
}

const Sidebar: React.FC<SidebarProps> = ({ children, songs }) => {
  const pathname = usePathname()
  const player = usePlayer()

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
    ],
    [pathname]
  )

  return (
    <div className={player.activeId ? styles.customView : styles.container}>
      <div className={styles.container__sidebar}>
        <Box>
          <div className={styles.container__sidebar__inner}>
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className={"full-overflow"}>
          <Library songs={songs} />
        </Box>
      </div>
      <main className={styles.container__main_content}>{children}</main>
    </div>
  )
}

export default Sidebar
