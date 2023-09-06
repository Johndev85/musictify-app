import styles from "../page.module.scss"

//components
import Header from "@/components/Header/Header"
import ListItem from "@/components/ListItem/ListItem"

export default function Home() {
  return (
    <section className={styles.home}>
      <Header>
        <div className={styles.home__top}>
          <h1>Welcome back</h1>
          <div className={styles.home__top__grid}>
            <ListItem
              name={"Liked Songs"}
              image="/images/liked.png"
              href="liked"
            />
          </div>
        </div>
      </Header>
      <div className={styles.home__section}>
        <div className={styles.home__section_title}>
          <h2>Newest songs</h2>
        </div>
        <div>List of Songs!</div>
      </div>
    </section>
  )
}
