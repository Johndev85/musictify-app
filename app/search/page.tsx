//styles
import styles from "./search.module.scss"

//libraries
import getSongsByTitle from "@/actions/getSongsByTitle"

//components
import Header from "@/components/Header/Header"
import SearchInput from "@/components/SearchInput/SearchInput"
import SearchContent from "./components/SearchContent/SearchContent"

interface SearchProps {
  searchParams: {
    title: string
  }
}

const Search = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsByTitle(searchParams.title)

  return (
    <section className={styles.container}>
      <Header className={styles.container__header}>
        <div className={styles.container__header__top}>
          <h1>Search</h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent songs={songs} />
    </section>
  )
}

export default Search
