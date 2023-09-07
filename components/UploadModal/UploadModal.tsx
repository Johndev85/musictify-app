"use client"

//styles
import styles from "./uploadModal.module.scss"

//libraries
import uniqid from "uniqid"
import useUploadModal from "@/hooks/useUploadModal"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { useUser } from "@/hooks/useUser"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"

//components
import Modal from "../Modal/Modal"
import Input from "../Input/Input"
import Button from "../Button/Button"
import Loader from "../Loader/Loader"

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false)
  const uploadModal = useUploadModal()
  const { user } = useUser()
  const supabaseclient = useSupabaseClient()
  const router = useRouter()

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  })

  const onChange = (open: boolean) => {
    if (!open) {
      reset()
      uploadModal.onClose()
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true)

      const imageFile = values.image?.[0]
      const songFile = values.song?.[0]

      if (!imageFile || !songFile || !user) {
        toast.error("Missing fields")
        return
      }

      const uniqueID = uniqid()

      //upload song
      const { data: songData, error: songError } = await supabaseclient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        })

      if (songError) {
        setIsLoading(false)
        return toast.error("Failed song upload.")
      }

      //upload image
      const { data: imageData, error: imageError } =
        await supabaseclient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          })

      if (imageError) {
        setIsLoading(false)
        return toast.error("Failed image upload")
      }

      const { error: supabaseError } = await supabaseclient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        })

      if (supabaseError) {
        setIsLoading(false)
        return toast.error(supabaseError.message)
      }

      router.refresh()
      setIsLoading(true)
      toast.success("Song created!")
      reset()
      uploadModal.onClose()
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      title="Add a song"
      description="Upload an Song file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Song Author"
        />
        <div className={styles.form__bottom}>
          <div className={styles.form__bottom_file}>Select a song file</div>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3"
            {...register("song", { required: true })}
          />
        </div>
        <div className={styles.form__bottom}>
          <div className={styles.form__bottom_file}>Select an image</div>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register("image", { required: true })}
          />
        </div>

        {isLoading ? (
          <div className={styles.form__loader}>
            <Loader />
          </div>
        ) : (
          <Button disabled={isLoading} type="submit" className={"big_green"}>
            Create
          </Button>
        )}
      </form>
    </Modal>
  )
}

export default UploadModal
