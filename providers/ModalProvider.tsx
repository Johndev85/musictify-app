"use client"

//libraries
import { useEffect, useState } from "react"

//components
import AuthModal from "@/components/AuthModal/AuthModal"

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <AuthModal />
    </>
  )
}

export default ModalProvider
