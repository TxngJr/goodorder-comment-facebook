import { isArray } from 'lodash'
import { isEmpty } from 'radash'

export function mergeObjects(obj1: any, obj2: any) {
  const result = { ...obj1 }

  for (const key in obj2) {
    if (result.hasOwnProperty(key)) {
      result[key] = { ...result[key], ...obj2[key] }
    } else {
      result[key] = obj2[key]
    }
  }

  return result
}

export const objectToArray = <T extends Record<string, any>>(obj: T): T[] => {
  return Object.keys(obj).map((key) => obj[key])
}

export const ignoreDateTimezone = (date: string): string => {
  return date.split('T')[0]
}

export const queryStringToArray = (queryString: any): string[] => {
  return isArray(queryString) && !isEmpty(queryString)
    ? (queryString as string[])
    : queryString
      ? [queryString as string]
      : []
}
