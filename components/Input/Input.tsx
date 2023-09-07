//styles
import styles from "./input.module.scss"

//libraries
import { forwardRef } from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, disabled, ...props }, ref) => {
    return (
      <input
        type={type}
        className={className ? styles.className : styles.input}
        disabled={disabled}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export default Input
