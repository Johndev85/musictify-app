"use client"

//types
import { Song } from "@/types"

//styles
import styles from "./searchContent.module.scss"

//components
import SongBox from "@/components/SongBox/SongBox"
import LikeButton from "@/components/LikeButton/LikeButton"

//hooks
import useOnPlay from "@/hooks/useOnPlay"

interface SearchContentProps {
  songs: Song[]
}

const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs)

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
            <SongBox
              onClick={(id: string) => {
                onPlay(id)
              }}
              data={song}
            />
            <LikeButton songId={song.id} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default SearchContent
