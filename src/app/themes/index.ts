import {
  createTheme as createMuiTheme,
  responsiveFontSizes,
} from '@mui/material/styles'
import { ThemeConfig } from 'antd'

import { createOptions as createBaseOptions } from './base/create-options'
import { createOptions as createLightOptions } from './light/create-options'

const themeConfig: ThemeConfig = {
  token: {
    fontFamily: 'Anuphan !important',
    colorPrimary: '#16b364',
  },
}

export default themeConfig

export const createTheme = (config: any) => {
  let theme = createMuiTheme(
    createBaseOptions({
      direction: config.direction,
    }),
    createLightOptions({
      colorPreset: config.colorPreset,
      contrast: config.contrast,
    }),
  )

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme)
  }

  return theme
}
