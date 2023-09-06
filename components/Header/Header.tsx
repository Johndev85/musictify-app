"use client"

//styles
import styles from "./header.module.scss"

//libraries
import { useRouter } from "next/navigation"
import { RxCaretLeft, RxCaretRight } from "react-icons/rx"
import { HiHome } from "react-icons/hi"
import { BiSearch } from "react-icons/bi"

//components
import Button from "../Button/Button"

interface HeaderProps {
  children: React.ReactNode
  className?: string
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter()

  const handleLogOut = () => {}

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
          <>
            <Button onClick={() => {}} className={"simple"}>
              Sign up
            </Button>
            <Button onClick={() => {}} className={"white"}>
              Log in
            </Button>
          </>
        </nav>
      </div>
      {children}
    </header>
  )
}

export default Header
