"use client"

//styles
import styles from "./header.module.scss"

//libraries
import { useRouter } from "next/navigation"
import { RxCaretLeft, RxCaretRight } from "react-icons/rx"
import { HiHome } from "react-icons/hi"
import { BiSearch } from "react-icons/bi"
import useAuthModal from "@/hooks/useAuthModal"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useUser } from "@/hooks/useUser"
import { FaUserAlt } from "react-icons/fa"

//components
import Button from "../Button/Button"

interface HeaderProps {
  children: React.ReactNode
  className?: string
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const authModal = useAuthModal()
  const router = useRouter()

  const supabaseClient = useSupabaseClient()
  const { user } = useUser()

  const handleLogOut = async () => {
    const { error } = await supabaseClient.auth.signOut()
    //Reset any playing song
    router.refresh()
    if (error) {
      console.log(error)
    }
  }

  return (
    <header className={className ? styles.className : styles.header}>
      <div className={styles.header__topMenu}>
        <div className={styles.header__topMenu__inner}>
          <button
            onClick={() => router.back()}
            className={styles.header__topMenu__inner_btn}
          >
            <RxCaretLeft size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className={styles.header__topMenu__inner_btn}
          >
            <RxCaretRight size={35} />
          </button>
        </div>
        <div className={styles.header__topMenu__bottom}>
          <button className={styles.header__topMenu__bottom_btn}>
            <HiHome size={28} />
          </button>
          <button className={styles.header__topMenu__bottom_btn}>
            <BiSearch size={28} />
          </button>
        </div>
        <nav className={styles.header__topMenu__subMenu}>
          {user ? (
            <div className={styles.header__topMenu__subMenu_logStatus}>
              <Button onClick={handleLogOut} className={"white"}>
                Logout
              </Button>
              <Button
                onClick={() => router.push("/account")}
                className={"rounded"}
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <Button onClick={authModal.onOpen} className={"simple"}>
                Sign up
              </Button>
              <Button onClick={authModal.onOpen} className={"white"}>
                Log in
              </Button>
            </>
          )}
        </nav>
      </div>
      {children}
    </header>
  )
}

export default Header
