//styles
import styles from "./library.module.scss"
import { TbPlaylist } from "react-icons/tb"
import { AiOutlinePlus } from "react-icons/ai"

const Library = () => {
  const onClick = () => {}

  return (
    <section className={styles.container}>
      <div className={styles.container__inner}>
        <div className={styles.container__inner_title}>
          <TbPlaylist
            className={styles.container__inner_title_icon}
            size={26}
          />
          <p>Your Library</p>
        </div>
        <AiOutlinePlus
          className={styles.container__inner_plusIcon}
          onClick={onClick}
        />
      </div>
      <div className={styles.container__list}>List of Songs!</div>
    </section>
  )
}

export default Library
