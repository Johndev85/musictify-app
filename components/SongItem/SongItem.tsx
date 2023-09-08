"use client"

//styles
import styles from "./songItem.module.scss"

//types
import { Song } from "@/types"

//libraries
import useLoadImage from "@/hooks/useLoadImage"
import Image from "next/image"

//components
import PlayButton from "../PlayButton/PlayButton"

interface SongItemProps {
  data: Song
  onClick: (id: string) => void
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  const imagePath = useLoadImage(data)

  return (
    <div className={styles.container} onClick={() => onClick(data.id)}>
      <picture className={styles.container__details}>
        <Image
          className={styles.container__details_img}
          src={imagePath || "/images/liked.png"}
          fill
          alt="image song"
        />
      </picture>
      <div className={styles.container__details_title}>
        <p>{data.title}</p>
        <span>By {data.author}</span>
      </div>
      <div className={styles.container__play}>
        <PlayButton />
      </div>
    </div>
  )
}

export default SongItem
