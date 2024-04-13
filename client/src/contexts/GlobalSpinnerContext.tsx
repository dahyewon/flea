import React, { useState, useContext, createContext } from 'react'

const GlobalSpinnerContext = createContext<boolean>(false)
const GlobalSpinnerActionsContext = createContext<
  React.Dispatch<React.SetStateAction<boolean>>
>(() => {})

// 글로벌 스피너 표시/비표시
export const useGlobalSpinnerContext = (): boolean =>
  useContext<boolean>(GlobalSpinnerContext)

// 글로벌 스피너 표시/비표시 액션
export const useGlobalSpinnerActionsContext = (): React.Dispatch<
  React.SetStateAction<boolean>
> =>
  useContext<React.Dispatch<React.SetStateAction<boolean>>>(
    GlobalSpinnerActionsContext,
  )

interface GlobalSpinnerContextProviderProps {
  children?: React.ReactNode
}

const GlobalSpinnerContextProvider = ({
  children,
}: GlobalSpinnerContextProviderProps) => {
  const [isGlobalSpinnerOn, setGlobalSpinner] = useState(false)

  return (
    <GlobalSpinnerContext.Provider value={isGlobalSpinnerOn}>
      <GlobalSpinnerActionsContext.Provider value={setGlobalSpinner}>
        {children}
      </GlobalSpinnerActionsContext.Provider>
    </GlobalSpinnerContext.Provider>
  )
}

export default GlobalSpinnerContextProvider