//styles
import styles from "./modal.module.scss"

//libraries
import * as Dialog from "@radix-ui/react-dialog"
import { IoMdClose } from "react-icons/io"

interface ModalProps {
  isOpen: boolean
  onChange: (open: boolean) => void
  title: string
  description: string
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onChange,
  title,
  description,
  children,
}) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.modal_overlay} />
        <Dialog.Content className={styles.modal__content}>
          <Dialog.Title className={styles.modal__content_title}>
            {title}
          </Dialog.Title>
          <Dialog.Description className={styles.modal__content_description}>
            {description}
          </Dialog.Description>
          <div className={styles.modal__content_elements}>{children}</div>
          <Dialog.Close asChild>
            <button className={styles.modal__content_btn}>
              <IoMdClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal
