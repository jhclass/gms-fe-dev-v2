import '@/styles/global.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import { RecoilRoot } from 'recoil'
import Head from 'next/head'
import { GlobalStyle } from '@/styles/GlobalStyle'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
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
  )
}
