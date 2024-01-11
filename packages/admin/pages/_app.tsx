import '@/styles/global.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import { RecoilRoot, RecoilEnv } from 'recoil'
import Head from 'next/head'
import { GlobalStyle } from '@/styles/GlobalStyle'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '@/lib/apolloClient'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || (page => page)
  return (
    <ApolloProvider client={apolloClient}>
      <RecoilRoot>
        <NextUIProvider>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
            />
            <title>HMS</title>
          </Head>
          <GlobalStyle />
          {getLayout(<Component {...pageProps} />)}
        </NextUIProvider>
      </RecoilRoot>
    </ApolloProvider>
  )
}
