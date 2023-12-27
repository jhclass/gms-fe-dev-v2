import '@/styles/global.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout/Layout'
import { NextUIProvider } from '@nextui-org/react'
import { ApolloProvider } from '@apollo/client'
import apolloClient from '@/lib/apolloClient'
import { RecoilRoot, RecoilEnv } from 'recoil'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }: AppProps) {
  RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false
  return (
    <ApolloProvider client={apolloClient}>
      <RecoilRoot>
        <NextUIProvider>
          <Layout>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
              />
              <meta
                name="naver-site-verification"
                content="7a5bb6648423e8d7bbca8430259b499b13412ec9"
              />
              <meta
                name="naver-site-verification"
                content="5562cb762e417b1c3d20bee2ae45eecaaf38b389"
              />
              <title>H ACADEMY | 에이치 아카데미</title>
            </Head>
            <Component {...pageProps} />
          </Layout>
        </NextUIProvider>
      </RecoilRoot>
    </ApolloProvider>
  )
}
