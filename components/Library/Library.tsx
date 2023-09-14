//styles
import styles from "./library.module.scss"

//types
import { Song } from "@/types"

//libraries
import { TbPlaylist } from "react-icons/tb"
import { AiOutlinePlus } from "react-icons/ai"
import useAuthModal from "@/hooks/useAuthModal"
import { useUser } from "@/hooks/useUser"
import useUploadModal from "@/hooks/useUploadModal"

//components
import SongBox from "../SongBox/SongBox"

interface LibraryProps {
  songs: Song[]
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
  const authModal = useAuthModal()
  const uploadModal = useUploadModal()
  const { user } = useUser()

  const onClick = () => {
    if (!user) {
      return authModal.onOpen()
    }

    //TODO: Check for subscription

    return uploadModal.onOpen()
  }

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
      <div className={styles.container__list}>
        {songs.map((item) => (
          <div key={item.id} className={styles.container__list_item}>
            <SongBox data={item} onClick={() => {}} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Library
