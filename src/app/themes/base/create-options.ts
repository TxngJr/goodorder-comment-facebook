import { ThemeOptions } from '@mui/material/styles/createTheme'

import { createComponents } from './create-component'
import { createTypography } from './create-typography'

export const createOptions = (config: any): ThemeOptions => {
  const { direction = 'ltr' } = config

  return {
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1600,
      },
    },
    components: createComponents(),
    direction,
    shape: {
      borderRadius: 8,
    },
    typography: createTypography(),
  }
}
