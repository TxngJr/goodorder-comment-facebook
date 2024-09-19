import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { isEmpty } from 'radash'
import store from 'store2'
import useSWR, { SWRConfiguration, SWRResponse } from 'swr'

import { JWT_TOKEN_NAME } from '../constants/auth-key'

export type GetRequest = AxiosRequestConfig | null

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_SERVICE || '',
})
instance.interceptors.request.use(async (config) => {
  const jwtToken = store.get(JWT_TOKEN_NAME)
  if (!isEmpty(jwtToken)) {
    config.headers['Authorization'] = `Bearer ${jwtToken}`
  }
  return config
})
export const axiosInstance = instance

export interface Return<Data, Error>
  extends Pick<
    SWRResponse<AxiosResponse<Data>, AxiosError<Error>>,
    'isValidating' | 'error' | 'mutate' | 'isLoading'
  > {
  data: Data | undefined
  response: AxiosResponse<Data> | undefined
}

export interface Config<Data = unknown, Error = unknown>
  extends Omit<
    SWRConfiguration<AxiosResponse<Data>, AxiosError<Error>>,
    'initialData'
  > {
  initialData?: Data
}

export default function useAxios<Data = unknown, Error = unknown>(
  request: GetRequest | undefined,
  {
    initialData,
    revalidateOnFocus = false,
    ...config
  }: Config<Data, Error> = {},
): Return<Data, Error> {
  const {
    data: response,
    error,
    isValidating,
    isLoading,
    mutate,
  } = useSWR<AxiosResponse<Data>, AxiosError<Error>>(
    request && JSON.stringify(request),
    /**
     * NOTE: Typescript thinks `request` can be `null` here, but the fetcher
     * function is actually only called by `useSWR` when it isn't.
     */
    () => axiosInstance.request<Data>(request!),
    {
      revalidateOnFocus,
      ...config,
    },
  )
  return {
    data: response && response.data,
    response,
    error,
    isLoading,
    isValidating,
    mutate,
  }
}
