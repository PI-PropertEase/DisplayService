/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState } from "react"

interface PropertyDetailsToastContextType {
    isShowing: boolean
    setIsShowing: React.Dispatch<React.SetStateAction<boolean>>
    toastMessage: string
    setToastMessage: React.Dispatch<React.SetStateAction<string>>
}

const defaultContextState: PropertyDetailsToastContextType = {
    isShowing: false,
    setIsShowing: () => {},
    toastMessage: "",
    setToastMessage: () => {},
}

export const PropertyDetailsToastContext = createContext<PropertyDetailsToastContextType>(defaultContextState)

export const PropertyDetailsToastContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isShowing, setIsShowing] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<string>("")

  return (
    <PropertyDetailsToastContext.Provider
      value={{
        isShowing,
        setIsShowing,
        toastMessage,
        setToastMessage,
      }}
    >
      {children}
    </PropertyDetailsToastContext.Provider>
  )
}
