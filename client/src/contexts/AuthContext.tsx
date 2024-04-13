import React, { useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import signin from '@/services/auth/signin'
import signout from '@/services/auth/signout'
import type { ApiContext, User } from '@/types/data'

type AuthContextType = {
  authUser?: User
  isLoading: boolean
  signin: (username: string, password: string) => Promise<void>
  signout: () => Promise<void>
}

type AuthContextProviderProps = {
  context: ApiContext
  authUser?: User
}

const AuthContext = React.createContext<AuthContextType>({
  authUser: undefined,
  isLoading: false,
  signin: async () => Promise.resolve(),
  signout: async () => Promise.resolve(),
})

export const useAuthContext = (): AuthContextType =>
  useContext<AuthContextType>(AuthContext)


export const AuthContextProvider = ({
  context,
  authUser,
  children,
}: React.PropsWithChildren<AuthContextProviderProps>) => {
  const queryClient = useQueryClient()

  const { data: userData, isLoading: isUserDataLoading } = useQuery<User>(
    `${context.apiRootUrl.replace(/\/$/g, '')}/users/me`,
  )

  // 로그인 뮤테이션
  const signinMutation = useMutation((credentials: { username: string; password: string }) => 
    signin(context, credentials)
  )
  // 로그아웃 뮤테이션
  const signoutMutation = useMutation(() => signout(context), {
    onSuccess: () => {
      queryClient.invalidateQueries(`${context.apiRootUrl.replace(/\/$/g, '')}/users/me`)
    },
  })

  const signinInternal = async (username: string, password: string) => {
    await signinMutation.mutateAsync({ username, password })
  }

  const signoutInternal = async () => {
    await signoutMutation.mutateAsync()
  }

  return (
    <AuthContext.Provider
      value={{
        authUser: userData ?? authUser,
        isLoading: isUserDataLoading,
        signin: signinInternal,
        signout: signoutInternal,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}