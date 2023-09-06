"use client"

//styles
import styles from "./listItem.module.scss"

//libraries
import { useRouter } from "next/navigation"
import Image from "next/image"
import { FaPlay } from "react-icons/fa"

interface ListItemProps {
  image: string
  name: string
  href: string
}

const ListItem: React.FC<ListItemProps> = ({ image, name, href }) => {
  const router = useRouter()

  const onClick = () => {
    // add authentication before push
    router.push(href)
  }

  return (
    <button onClick={onClick} className={styles.listItem__btn}>
      <div className={styles.listItem__btn__content}>
        <Image
          className={styles.listItem__btn__content_img}
          width={80}
          height={80}
          src={image}
          alt="Image"
        />
        <p>{name}</p>
      </div>

      <div className={styles.listItem__btn_icon}>
        <FaPlay />
      </div>
    </button>
  )
}

export default ListItem
