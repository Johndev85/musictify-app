"use client"

//types
import { Song } from "@/types"

//styles
import styles from "./searchContent.module.scss"

//components
import SongBox from "@/components/SongBox/SongBox"

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
          </div>
          {/* TODO: Add Like Button Here */}
        </div>
      ))}
    </div>
  )
}

export default SearchContent
