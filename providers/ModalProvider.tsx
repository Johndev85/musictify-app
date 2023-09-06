"use client"

//libraries
import { useEffect, useState } from "react"

//components
import Modal from "@/components/Modal/Modal"

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
      <Modal
        title="Test Modal"
        description="Test description"
        isOpen
        onChange={() => {}}
      >
        Test children
      </Modal>
    </>
  )
}

export default ModalProvider
