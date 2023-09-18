//styles
import styles from "./account.module.scss"

//components
import Header from "@/components/Header/Header"
import AccountContent from "./components/AccountContent"

const Account = () => {
  return (
    <section className={styles.container}>
      <Header>
        <div className={styles.container__title}>
          <h1>Account settings</h1>
        </div>
      </Header>
      <AccountContent />
    </section>
  )
}

export default Account
