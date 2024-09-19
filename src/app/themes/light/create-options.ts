import { createComponents } from './create-components'
import { createPalette } from './create-palette'
import { createShadows } from './create-shadows'

interface CreateOptionsProps {
  colorPreset: string
  contrast: string
}

export const createOptions = (options: CreateOptionsProps) => {
  const { colorPreset, contrast } = options
  const palette = createPalette({ colorPreset, contrast })
  const components = createComponents({ palette })
  const shadows = createShadows()

  return {
    components,
    palette,
    shadows,
  }
}
