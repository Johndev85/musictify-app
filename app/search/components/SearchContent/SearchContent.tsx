"use client"

//types
import { Song } from "@/types"

//styles
import styles from "./searchContent.module.scss"

//components
import SongBox from "@/components/SongBox/SongBox"
import LikeButton from "@/components/LikeButton/LikeButton"

interface SearchContentProps {
  songs: Song[]
}

const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
  if (songs.length === 0) {
    return (
      <div className={styles.container}>
        <span>No songs found.</span>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {songs.map((song) => (
        <div key={song.id} className={styles.container__songs}>
          <div className={styles.container__songs__card}>
            <SongBox onClick={() => {}} data={song} />
            <LikeButton songId={song.id} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default SearchContent
