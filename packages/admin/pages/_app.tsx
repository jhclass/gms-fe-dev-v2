import '@/styles/global.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import { RecoilRoot, RecoilEnv, useRecoilState } from 'recoil'
import Head from 'next/head'
import { GlobalStyle } from '@/styles/GlobalStyle'
import { ApolloProvider, useReactiveVar } from '@apollo/client'
import { apolloClient, isLoggedInVar } from '@/lib/apolloClient'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { isScreenState, navOpenState } from '@/lib/recoilAtoms'
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev'
import { __DEV__ } from '@apollo/client/utilities/globals'

if (__DEV__) {
  // Adds messages only in a dev environment
  loadDevMessages()
  loadErrorMessages()
}
export default function MyApp({ Component, pageProps }: AppProps) {
  RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false

  return (
    <ApolloProvider client={apolloClient}>
      <RecoilRoot>
        <NextUIProvider>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
            />
            <title>H-Class | 하이클래스</title>
          </Head>
          <GlobalStyle />
          <Component {...pageProps} />
        </NextUIProvider>
      </RecoilRoot>
    </ApolloProvider>
  )
}
