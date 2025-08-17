import type { AppProps } from 'next/app'
import { IsLoginProvider } from './components/Login/IsLoginContext'
import '../globalStyles.scss'
import '../fonts.scss'
import LoginStatus from './components/Login/LoginStatus'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache(),
})

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <IsLoginProvider>
                <LoginStatus></LoginStatus>
                <Component {...pageProps} />
            </IsLoginProvider>
        </ApolloProvider>
    )
}
