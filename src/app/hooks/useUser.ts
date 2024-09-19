import { useMemo } from 'react'
import store from 'store2'
import { SWRConfiguration } from 'swr'

import useAxios from './useAxios'

import { JWT_TOKEN_NAME } from '../constants/auth-key'
import { mockUser } from '../resources/user'
import { IUser } from '../types/user'

export const useUser = () => {
  const isAuthenticated = useMemo(() => {
    return !!store.get(JWT_TOKEN_NAME)
  }, [])

  const logout = () => {
    store.remove(JWT_TOKEN_NAME)
    window.location.href = '/login'
  }

  const { data } = useAxios<Partial<IUser>>(
    isAuthenticated ? { url: `/users/me` } : null,
    {
      onError: logout,
      revalidateOnFocus: true,
    },
  )

  // return {
  //   loading: !data,
  //   user: {
  //     ...data,
  //   },
  //   logout,
  //   isAuthenticated,
  // }
  return {
    loading: false,
    user: mockUser,
    logout,
    isAuthenticated,
  }
}

export const useUserInfo = (username: string, option?: SWRConfiguration) => {
  const isAuthenticated = useMemo(() => {
    return !!store.get(JWT_TOKEN_NAME)
  }, [])

  const { data, isLoading, mutate } = useAxios<IUser>(
    isAuthenticated
      ? {
          url: `/api/users/info/${username}`,
        }
      : null,
    option,
  )
  return {
    data,
    isLoading,
    mutate,
  }
}
