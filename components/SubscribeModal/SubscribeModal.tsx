"use client"

//types
import { Price, ProductWithPrice } from "@/types"

//styles
import styles from "./subscribeModal.module.scss"

//libraries
import { useState } from "react"
import { useUser } from "@/hooks/useUser"
import toast from "react-hot-toast"
import { postData } from "@/libs/helpers"
import { getStripe } from "@/libs/stripeClient"
import useSubscribeModal from "@/hooks/useSubscribeModal"

//components
import Modal from "../Modal/Modal"
import Button from "../Button/Button"
import Loader from "../Loader/Loader"

interface SubscribeModalProps {
  products: ProductWithPrice[]
}

const formatPrice = (price: Price) => {
  const priceString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100)

  return priceString
}

const SubscribeModal: React.FC<SubscribeModalProps> = ({ products }) => {
  const subscribeModal = useSubscribeModal()
  const { user, isLoading, subscription } = useUser()
  const [priceIdLoading, setPriceIdLoading] = useState<string>()

  const onChange = (open: boolean) => {
    if (!open) {
      subscribeModal.onClose()
    }
  }

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id)

    if (!user) {
      setPriceIdLoading(undefined)
      return toast.error("Must be logged in")
    }

    if (subscription) {
      setPriceIdLoading(undefined)
      return toast("Already subscribe")
    }

    try {
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { price },
      })

      const stripe = await getStripe()
      stripe?.redirectToCheckout({ sessionId })
    } catch (error) {
      toast.error((error as Error)?.message)
    } finally {
      setPriceIdLoading(undefined)
    }
  }

  let content = (
    <div className={styles.content}>
      <p>No products avaible.</p>
    </div>
  )

  if (products.length) {
    content = (
      <div className={styles.content}>
        {products.map((product) => {
          if (!product.prices?.length) {
            return <div key={product.id}>No prices available</div>
          }

          return priceIdLoading ? (
            <Loader />
          ) : (
            product.prices.map((price) => (
              <Button
                className="green"
                key={price.id}
                onClick={() => handleCheckout(price)}
                disabled={isLoading || price.id === priceIdLoading}
              >
                {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
              </Button>
            ))
          )
        })}
      </div>
    )
  }

  if (subscription) {
    content = (
      <div className={styles.content}>
        <p>Already subscribed</p>
      </div>
    )
  }

  return (
    <Modal
      title="Only Plus Users"
      description="Listen to music with Musictify Plus"
      isOpen={subscribeModal.isOpen}
      onChange={onChange}
    >
      {content}
    </Modal>
  )
}

export default SubscribeModal
