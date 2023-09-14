"use client"
import useGetSongById from "@/hooks/useGetSongById"
//styles
import styles from "./player.module.scss"

//hooks
import usePlayer from "@/hooks/usePlayer"
import useLoadSongUrl from "@/hooks/useLoadSongUrl"

//components
import PlayerContent from "../PlayerContent/PlayerContent"

const Player = () => {
  const player = usePlayer()
  const { song } = useGetSongById(player.activeId)

  const songUrl = useLoadSongUrl(song)

  if (!song || !songUrl || !player.activeId) {
    return null
  }

  return (
    <div className={styles.container}>
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  )
}

export default Player
