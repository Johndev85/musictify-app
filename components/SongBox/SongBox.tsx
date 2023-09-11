//styles
import styles from "./songBox.module.scss"

//hooks
import useLoadImage from "@/hooks/useLoadImage"

//types
import { Song } from "@/types"

//components
import Image from "next/image"

interface SongBoxProps {
  data: Song
  onClick?: (id: string) => void
}

const SongBox: React.FC<SongBoxProps> = ({ data, onClick }) => {
  const imageUrl = useLoadImage(data)

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id)
    }

    //TODO:  Default turn on play
  }

  return (
    <div className={styles.container} onClick={handleClick}>
      <Image
        className={styles.container_img}
        width={40}
        height={40}
        src={imageUrl || "/images/liked.png"}
        alt={data.author}
      />
      <div className={styles.container__text}>
        <p className={styles.container__text_title}>{data.title}</p>
        <p className={styles.container__text_author}>{data.author}</p>
      </div>
    </div>
  )
}

export default SongBox
