import '@/styles/global.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import { RecoilRoot, RecoilEnv } from 'recoil'
import Head from 'next/head'
import { GlobalStyle } from '@/styles/GlobalStyle'
import { ApolloProvider, useReactiveVar } from '@apollo/client'
import { apolloClient, isLoggedInVar } from '@/lib/apolloClient'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
export default function MyApp({ Component, pageProps }: AppProps) {
  RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false

  //현재 로그인상태

  const router = useRouter()
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  useEffect(() => {
    console.log(isLoggedIn, '현재 로그인상태?')
    if (!isLoggedIn && router.pathname !== '/login') {
      router.push('/login')
    }
  }, [isLoggedIn, router])
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
