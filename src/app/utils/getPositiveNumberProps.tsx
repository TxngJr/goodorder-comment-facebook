import numeral from 'numeral'

import { NUMBER_FORMAT } from '../constants/global'

interface IPositiveOption {
  format?: any
  colors?: [string, string]
  prefix?: string
}

const getPositiveNumberProps = (n: number, option: IPositiveOption) => {
  const { format = NUMBER_FORMAT, colors = ['#288EFF', '#CB1010'] } = option
  const prefix = typeof option.prefix === 'string' ? option.prefix : '+'
  if (n > 0) {
    return {
      color: colors[0],
      children: `${prefix}${numeral(n).format(format)}`,
    }
  }
  if (n < 0) {
    return {
      color: colors[1],
      children: `${numeral(n).format(format)}`,
    }
  }
  return {
    color: '#183054',
    children: `${numeral(n).format(format)}`,
  }
}

export default getPositiveNumberProps
