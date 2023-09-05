//styles
import styles from "./sidebarItem.module.scss"

//libraries
import React from "react"
import { IconType } from "react-icons"
import Link from "next/link"

interface SidebarItemProps {
  icon: IconType
  label: string
  active?: boolean
  href: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active,
  href,
}) => {
  return (
    <Link
      href={href}
      className={active ? styles.container__active : styles.container}
    >
      <Icon size={26} />
      <p className={styles.container__label}>{label}</p>
    </Link>
  )
}

export default SidebarItem
