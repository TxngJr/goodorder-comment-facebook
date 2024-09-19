import axios from 'axios'
import { PDFDocument } from 'pdf-lib'

import { axiosInstance } from '../hooks/useAxios'

export class PdfUtil {
  provider: string
  setPopupMessage: ((message: string) => void) | undefined

  constructor(provider: string) {
    this.provider = provider
  }

  public setPopupMessageHandler(handler: (message: string) => void) {
    this.setPopupMessage = handler
  }

  public async openLink(data: Record<string, any>): Promise<void> {
    try {
      const response = await axiosInstance.post(
        `/trackings/${this.provider}/print`,
        data,
      )
      const url = response?.data?.url ?? null
      if (url) {
        window.open(url, '_blank')
        return
      }
      alert(`ไม่พบรายการพิมพ์ในระบบ`)
    } catch (error) {
      console.error(error)
    }
  }

  public async thaipost(data: Record<string, any>): Promise<any> {}

  public async flash(orderIds: string[], size: string | number): Promise<any> {
    const mergedPdf = await PDFDocument.create()
    let success = 0
    for (const orderId of orderIds) {
      try {
        const response = await axiosInstance.post(
          `/trackings/${this.provider}/print`,
          {
            provider: this.provider,
            orders: [orderId],
            note: '',
            size: size,
          },
          {
            responseType: 'arraybuffer',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/pdf',
            },
          },
        )

        const pdfBytes = response.data
        const pdf = await PDFDocument.load(pdfBytes)
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        copiedPages.forEach((page: any) => {
          mergedPdf.addPage(page)
        })
        success++
        this.setPopupMessage?.('กำลังพิมพ์ ' + success + '/' + orderIds.length)
      } catch (e) {
        console.error(e)
      }
    }

    if (success > 0) {
      const mergedPdfFile = await mergedPdf.save()
      const blob = new Blob([mergedPdfFile], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      window.open(url, '_blank')
    } else {
      alert(`ไม่พบรายการพิมพ์ในระบบ`)
    }
  }

  public async bestexpress(orderIds: string[]): Promise<any> {
    const mergedPdf = await PDFDocument.create()
    let success = 0
    for (const orderId of orderIds) {
      try {
        const response = await axiosInstance.post(
          `/trackings/${this.provider}/print`,
          {
            provider: this.provider,
            orders: [orderId],
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )

        const pdfStream = response.data?.pdf ?? null
        if (!pdfStream) {
          continue
        }
        const data = atob(pdfStream)
        const pdfBytes = new Uint8Array(data.length)
        for (let i = 0; i < data.length; i++) {
          pdfBytes[i] = data.charCodeAt(i)
        }

        const arrayBuffer = pdfBytes.buffer

        const pdf = await PDFDocument.load(arrayBuffer)
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page)
        })

        success++
        this.setPopupMessage?.('กำลังพิมพ์ ' + success + '/' + orderIds.length)
      } catch (e) {
        console.error(e)
      }
    }

    if (success > 0) {
      const mergedPdfFile = await mergedPdf.save()
      const blob = new Blob([mergedPdfFile], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      window.open(url, '_blank')
    } else {
      alert(`ไม่พบรายการพิมพ์ในระบบ`)
    }
  }

  public async kerry(orders: any): Promise<any> {
    const mergedPdf = await PDFDocument.create()
    let success = 0
    for (const order of orders) {
      try {
        const queryString = this.objectToQueryString(order)
        const url = 'https://exportv1.systemtong.com/export/pdf/kerry'
        const pdfBytes = await fetch(url, {
          body: queryString,
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }).then((res) => res.arrayBuffer())

        if (!pdfBytes) {
          continue
        }

        const pdf = await PDFDocument.load(pdfBytes)
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page)
        })

        success++
        this.setPopupMessage?.('กำลังพิมพ์ ' + success + '/' + orders.length)
      } catch (e) {
        console.error(e)
      }
    }

    if (success > 0) {
      const mergedPdfFile = await mergedPdf.save()
      const blob = new Blob([mergedPdfFile], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      window.open(url, '_blank')
    } else {
      alert(`ไม่พบรายการพิมพ์ในระบบ`)
    }
  }

  async setOrderIsPrinted(orderIds: string[]): Promise<any> {
    try {
      await axiosInstance.put(`/order/setIsPrinted`, {
        orders: orderIds,
      })
    } catch (e) {
      console.error(e)
    }
  }

  objectToQueryString = (obj: any, prefix = ''): string => {
    const queryString = Object.keys(obj)
      .map((key) => {
        const value = obj[key]
        const prefixedKey = prefix ? `${prefix}[${key}]` : key

        if (typeof value === 'object' && value !== null) {
          return this.objectToQueryString(value, prefixedKey)
        } else {
          return `${encodeURIComponent(prefixedKey)}=${encodeURIComponent(
            value,
          )}`
        }
      })
      .join('&')

    return queryString
  }
}
