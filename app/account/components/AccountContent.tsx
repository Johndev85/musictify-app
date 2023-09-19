"use client"

import { useRouter } from "next/navigation"
//styles
import styles from "./accountContent.module.scss"

//libraries
import { useEffect, useState } from "react"
import { postData } from "@/libs/helpers"
import toast from "react-hot-toast"

//hooks
import useSubscribeModal from "@/hooks/useSubscribeModal"
import { useUser } from "@/hooks/useUser"

//components
import Button from "@/components/Button/Button"
import Loader from "@/components/Loader/Loader"

const AccountContent = () => {
  const router = useRouter()
  const subscribeModal = useSubscribeModal()
  const { isLoading, subscription, user } = useUser()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/")
    }
  }, [isLoading, user, router])

  const redirectToCustomerPortal = async () => {
    setLoading(true)
    try {
      const { url, error } = await postData({
        url: "/api/create-portal-link",
      })
      window.location.assign(url)
    } catch (error) {
      if (error) {
        toast.error((error as Error).message)
      }
    }
    setLoading(false)
  }

  return (
    <section className={styles.container}>
      {user && <h3>{user.email}</h3>}
      {!subscription && (
        <div className={styles.container__internal}>
          <p>No active plan.</p>
          <Button className="green" onClick={subscribeModal.onOpen}>
            Subscribe
          </Button>
        </div>
      )}
      {subscription && (
        <div className={styles.container__internal}>
          <p>
            You are currently on the{" "}
            <b>{subscription?.prices?.products?.name}</b> plan.
          </p>
          <div className={styles.container__internal_btn}>
            {loading ? (
              <Loader />
            ) : (
              <Button
                className="green"
                disabled={loading || isLoading}
                onClick={redirectToCustomerPortal}
              >
                Open Customer Portal
              </Button>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default AccountContent
