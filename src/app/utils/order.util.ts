import axios from 'axios'

import { axiosInstance } from '../hooks/useAxios'

interface ITestScope {
  amphoe: string
  name: string
  phone: string[]
  postcode: string
  province: string
  tambon: string
}

export interface IAddressMessage {
  amphoe: {
    scope: [number, number]
    text: string
  }
  is_address_score: number
  name: {
    scope: [number, number]
    text: string
  }
  original_text: string
  other: string
  phone: {
    scope: [number, number]
    text: string
  }[]
  postcode: {
    scope: [number, number]
    text: string
  }
  province: {
    scope: [number, number]
    text: string
  }
  tambon: {
    scope: [number, number]
    text: string
  }
  test_scope: ITestScope
}

export interface IAddressExtractor {
  message: IAddressMessage
}

export class OrderUtil {
  static amphurMueang(amphur: string, province: string): string {
    if (amphur.includes('เมือง')) {
      return `${amphur}${province}`
    }

    return amphur
  }

  static async extractAddress(text: string): Promise<IAddressMessage> {
    const url = process.env.REACT_APP_API_FORMAT_ADDRESS_URL
    const token = process.env.REACT_APP_API_FORMAT_ADDRESS_TOKEN
    try {
      const response = await axios.post<IAddressExtractor>(
        `${url}?token=${token}`,
        {
          text,
        },
      )
      return response.data.message
    } catch (e: any) {
      throw new Error(e.message)
    }
  }

  static async getProductByCodes(
    products: { code: string; amount: number; discount: number }[],
  ): Promise<any> {
    const response = await axiosInstance.post('/product/checking', { products })
    return response.data
  }

  static async getDistibutionChannelByName(name: string): Promise<any> {
    const response = await axiosInstance.get(
      `/distribution-channels/name/${name}`,
    )
    return response.data
  }

  static async extractOrderMessage(text: string): Promise<any> {
    const address: IAddressMessage = await this.extractAddress(text)
    let addressOther = address.other ? address.other : ''

    const socialsMatches = text.match(/s:\s*(.*)/)
    let social = ''
    if (socialsMatches) {
      addressOther = addressOther.replace(socialsMatches[0], '')
      social = socialsMatches[0].replace('s:', '').trim()
    }

    const channelsMatches = text.match(/c:\s*(.*)/)
    let channel
    if (channelsMatches) {
      addressOther = addressOther.replace(channelsMatches[0], '')
      try {
        channel = await this.getDistibutionChannelByName(
          channelsMatches[0].replace('c:', '').trim(),
        )
      } catch (e) {}
    }

    const commissionUserMatches = text.match(/k:\s*(.*)/)
    let commissionUser
    if (commissionUserMatches) {
      addressOther = addressOther.replace(commissionUserMatches[0], '')
      try {
        commissionUser = commissionUserMatches[0].replace('k:', '').trim()
      } catch (e) {}
    }

    const isCodsMessage = ['COD', 'เก็บปลายทาง', 'ปลายทาง']
    const isCod = isCodsMessage.some((codMessage) => text.includes(codMessage))
    if (isCod) {
      isCodsMessage.map((codMessage) => {
        addressOther = addressOther.replace(codMessage, '')
      })
    }

    const productsInlines = text.match(/(.+?)\s*\/\s*(\d+)\s*ชิ้น\s*(-?\d+)?/g)
    const products: any[] = []
    if (productsInlines) {
      productsInlines.map((productInline) => {
        addressOther = addressOther.replace(productInline.trim(), '')
        const match = productInline.match(
          /(.+?)\s*\/\s*(\d+)\s*ชิ้น\s*(-?\d+)?/,
        )
        const code = match![1]
        const amount = match![2] || 1
        const discount = Math.abs(Number(match![3]) || 0)

        products.push({
          code,
          amount: Number(amount),
          discount: Number(discount),
        })
      })
    }

    let productsDocs = []
    if (products.length) {
      try {
        productsDocs = await this.getProductByCodes(products)
      } catch (e) {}
    }

    const noteWords = ['หมายเหตุ', 'เพิ่มเติม']
    let note = ''

    noteWords.map((noteWord) => {
      const extractNoteMessage = text.match(
        new RegExp(`${noteWord}\\s*([\\s\\S]*)`, 'g'),
      )
      if (extractNoteMessage && !note) {
        note = extractNoteMessage[0].replace(/\s+/g, ' ')
      }
    })

    addressOther = addressOther.replace(note, '')

    return {
      address: {
        ...address,
        tambon: {
          text:
            address.province.text === 'กรุงเทพมหานคร'
              ? `แขวง${address.tambon.text}`
              : address.tambon.text,
        },
        amphoe: {
          text:
            address.province.text === 'กรุงเทพมหานคร'
              ? `เขต${address.amphoe.text}`
              : `อำเภอ${address.amphoe.text}`,
        },
        other: addressOther,
      },
      social,
      commissionUser,
      channel,
      isCod,
      products: productsDocs.map((product: any) => {
        return {
          ...product,
          amount: Number(product?.amount ?? 0),
          discount: Number(product?.discount ?? 0),
        }
      }),
      note,
    }
  }
}
