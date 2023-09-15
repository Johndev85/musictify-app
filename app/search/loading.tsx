"use client"

//styles
import styles from "../../styles/loading.module.scss"

//components
import Loader from "@/components/Loader/Loader"

import Box from "@/components/Box/Box"

const Loading = () => {
  return (
    <Box className="full-overflow">
      <div className={styles.container}>
        <Loader />
      </div>
    </Box>
  )
}

export default Loading
