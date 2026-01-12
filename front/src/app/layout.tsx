'use client'

import React, { ReactNode } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { IsLoginProvider } from '../Login/IsLoginContext'
import LoginStatus from '../Login/LoginStatus'
import '../globalStyles.scss'
import '../fonts.scss'

// Глобальный Apollo-клиент для всего Next-приложения
const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache(),
})

type RootLayoutProps = {
    children: ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
    return (
        <html lang="en">
            <body>
                <ApolloProvider client={client}>
                    <IsLoginProvider>
                        <LoginStatus />
                        {children}
                    </IsLoginProvider>
                </ApolloProvider>
            </body>
        </html>
    )
}

export default RootLayout
