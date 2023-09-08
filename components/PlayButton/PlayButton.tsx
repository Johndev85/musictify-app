//styles
import styles from "./playButton.module.scss"

//libraries
import { FaPlay } from "react-icons/fa"

const PlayButton = () => {
  return (
    <button className={styles.playBtn}>
      <FaPlay className={styles.playBtn_icon} />
    </button>
  )
}

export default PlayButton
