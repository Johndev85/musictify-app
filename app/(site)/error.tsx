"use client"

import styles from "../../styles/error.module.scss"

import Box from "@/components/Box/Box"

const Error = () => {
  return (
    <Box className="full-overflow">
      <div className={styles.container}>Something went wrong.</div>
    </Box>
  )
}

export default Error
