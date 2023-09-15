"use client"

//styles
import styles from "./playerContent.module.scss"

//types
import { Song } from "@/types"

//libraries
import { useEffect, useState } from "react"
import { BsPauseFill, BsPlayFill } from "react-icons/bs"
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai"
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2"
import useSound from "use-sound"

//components
import LikeButton from "../LikeButton/LikeButton"
import SongBox from "../SongBox/SongBox"
import Slider from "../Slider/Slider"

//hooks
import usePlayer from "@/hooks/usePlayer"

interface PlayerContentProps {
  song: Song
  songUrl: string
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const [volume, setVolume] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)

  const player = usePlayer()
  const Icon = isPlaying ? BsPauseFill : BsPlayFill
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return
    }
    const currentIndex = player.ids.findIndex((id) => id === player.activeId)
    const nextSong = player.ids[currentIndex + 1]

    if (!nextSong) {
      return player.setId(player.ids[0])
    }
    player.setId(nextSong)
  }

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return
    }
    const currentIndex = player.ids.findIndex((id) => id === player.activeId)
    const previousSong = player.ids[currentIndex - 1]

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1])
    }
    player.setId(previousSong)
  }

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false)
      onPlayNext()
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  })

  useEffect(() => {
    sound?.play()

    return () => {
      sound?.unload()
    }
  }, [sound])

  const handlePlay = () => {
    if (!isPlaying) {
      play()
    } else {
      pause()
    }
  }

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1)
    } else {
      setVolume(0)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.container__inner}>
        <div className={styles.container__inner__inter}>
          <SongBox data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      <div className={styles.container__middle}>
        <div className={styles.container__middle__controls}>
          <div className={styles.container__middle__controls__arrows}>
            <AiFillStepBackward
              onClick={onPlayPrevious}
              size={30}
              className={styles.container__middle__controls__arrows_icons}
            />
          </div>
          <div
            onClick={handlePlay}
            className={styles.container__middle__controls__play}
          >
            <Icon
              size={30}
              className={styles.container__middle__controls__play_icon}
            />
          </div>
          <div className={styles.container__middle__controls__arrows}>
            <AiFillStepForward
              onClick={onPlayNext}
              size={30}
              className={styles.container__middle__controls__arrows_icons}
            />
          </div>
        </div>

        <div className={styles.container__middle__volume}>
          <VolumeIcon
            onClick={toggleMute}
            size={34}
            className={styles.container__middle__volume_icon}
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  )
}

export default PlayerContent
