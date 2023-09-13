//styles
import styles from "./likedPage.module.scss"

//actions
import getLikedSongs from "@/actions/getLikedSongs"

//components
import Header from "@/components/Header/Header"
import Image from "next/image"
import LikedContent from "./components/LikedContent"

const Liked = async () => {
  const songs = await getLikedSongs()

  return (
    <section className={styles.container}>
      <Header>
        <div className={styles.container__inter}>
          <div className={styles.container__inter_inner}>
            <div className={styles.container__inter_inner_conter}>
              <Image
                fill
                src="/images/liked.png"
                className={styles.container__inter_inner_conter_img}
                alt="play list"
              />
            </div>
            <div className={styles.container__inter_inner_text}>
              <p>Play List</p>
              <h1>Liked Songs</h1>
            </div>
          </div>
        </div>
      </Header>
      <LikedContent songs={songs} />
    </section>
  )
}

export default Liked
