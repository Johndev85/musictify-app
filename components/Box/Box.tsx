//styles
import styles from "./box.module.scss"

interface BoxProps {
  children: React.ReactNode
  className?: string
}

const Box: React.FC<BoxProps> = ({ children, className }) => {
  return (
    <header
      className={
        className === "full-overflow"
          ? styles.container__fullOverflow
          : styles.container
      }
    >
      <div className={styles.header}>{children}</div>
    </header>
  )
}

export default Box
