"use client"

//styles
import styles from "./pageContent.module.scss"

//types
import { Song } from "@/types"

//components
import SongItem from "@/components/SongItem/SongItem"

//hooks
import useOnPlay from "@/hooks/useOnPlay"

interface PagecontentProps {
  songs: Song[]
}

const PageContent: React.FC<PagecontentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs)

  if (songs.length === 0) {
    return (
      <div className={styles.empty}>
        <p> No songs available.</p>
      </div>
    )
  }
  return (
    <div className={styles.pageContent}>
      {songs.map((item) => (
        <SongItem
          key={item.id}
          onClick={(id: string) => onPlay(id)}
          data={item}
        />
      ))}
    </div>
  )
}

export default PageContent
