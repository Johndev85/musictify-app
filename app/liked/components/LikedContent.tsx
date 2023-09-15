"use client"

//styles
import styles from "./likedContent.module.scss"

//libraries
import { useRouter } from "next/navigation"
import { useEffect } from "react"

//types
import { Song } from "@/types"

//hooks
import { useUser } from "@/hooks/useUser"
import useOnPlay from "@/hooks/useOnPlay"

//components
import SongBox from "@/components/SongBox/SongBox"
import LikeButton from "@/components/LikeButton/LikeButton"

interface LikedContentPros {
  songs: Song[]
}

const LikedContent: React.FC<LikedContentPros> = ({ songs }) => {
  const router = useRouter()
  const { isLoading, user } = useUser()

  const OnPlay = useOnPlay(songs)

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/")
    }
  }, [isLoading, user, router])

  if (songs.length === 0) {
    return (
      <div className={styles.container}>
        <p>No liked songs.</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {songs.map((song) => (
        <div key={song.id} className={styles.container__list}>
          <div className={styles.container__list_item}>
            <SongBox
              onClick={(id: string) => {
                OnPlay(id)
              }}
              data={song}
            />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  )
}

export default LikedContent
