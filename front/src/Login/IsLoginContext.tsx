import React, { createContext, useContext, useState, ReactNode } from 'react'

export const IsLoginProvider = ({ children }: { children: ReactNode }) => {
    const [isAuth, setIsAuth] = useState<boolean | undefined>(undefined)

    return (
        <isLoginContext.Provider value={{ isAuth, setIsAuth }}>
            {children}
        </isLoginContext.Provider>
    )
}
export const useIsLogin = (): {
    isAuth: boolean | undefined
    setIsAuth: (value: boolean) => boolean
} => {
    const context = useContext(isLoginContext)
    return context
}

const isLoginContext = createContext(undefined)
