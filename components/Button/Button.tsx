//styles
import React, { forwardRef } from "react"
import styles from "./button.module.scss"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, type = "button", ...props }, ref) => {
    return (
      <button
        type={type}
        className={
          className === "white"
            ? styles.btn_white
            : className === "green"
            ? styles.btn_green
            : className === "rounded"
            ? styles.btn_rounded
            : styles.btn_simple
        }
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export default Button
