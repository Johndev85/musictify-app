"use client"
//types
import { ProductWithPrice } from "@/types"

//libraries
import { useEffect, useState } from "react"

//components
import AuthModal from "@/components/AuthModal/AuthModal"
import UploadModal from "@/components/UploadModal/UploadModal"
import SubscribeModal from "@/components/SubscribeModal/SubscribeModal"

interface ModalProviderProps {
  products: ProductWithPrice[]
}

const ModalProvider: React.FC<ModalProviderProps> = ({ products }) => {
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
      <UploadModal />
      <SubscribeModal products={products} />
    </>
  )
}

export default ModalProvider
