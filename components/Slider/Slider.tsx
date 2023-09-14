"use client"

//styles
import styles from "./slider.module.scss"

//libraries
import * as RadixSlider from "@radix-ui/react-slider"

interface SliderProps {
  value: number
  onChange?: (value: number) => void
}

const Slider: React.FC<SliderProps> = ({ value = 1, onChange }) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0])
  }

  return (
    <RadixSlider.Root
      className={styles.slider}
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.1}
      aria-label="Volume"
    >
      <div className={styles.slider__container}>
        <RadixSlider.Track className={styles.slider__container__track}>
          <RadixSlider.Range
            className={styles.slider__container__track__range}
          />
        </RadixSlider.Track>
      </div>
      <RadixSlider.Thumb
        className={styles.slider__container__track__volume}
        aria-label="Volume"
      />
    </RadixSlider.Root>
  )
}

export default Slider
