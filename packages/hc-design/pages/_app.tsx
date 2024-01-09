import '@/styles/global.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout/Layout'
import { NextUIProvider } from '@nextui-org/react'
import { ApolloProvider } from '@apollo/client'
import apolloClient from '@/lib/apolloClient'
import { RecoilRoot, RecoilEnv } from 'recoil'
import Head from 'next/head'
import Script from 'next/script'

export default function MyApp({ Component, pageProps }: AppProps) {
  RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false

  return (
    <ApolloProvider client={apolloClient}>
      <RecoilRoot>
        <NextUIProvider>
          <Layout>
            <Head>
              <Script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=G-WP8Q4MBES6`}
              />
              <Script
                dangerouslySetInnerHTML={{
                  __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-WP8Q4MBES6', {
            page_path: window.location.pathname,
          });
        `,
                }}
              />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
              />
              <meta
                name="naver-site-verification"
                content="b4b50776b3b55da6f0bf7cec11cf908a2da0cf1f"
              />
              <title>H ACADEMY | 에이치 아카데미</title>
              <meta
                name="description"
                content="모션그래픽, 웹툰, 이모티콘, 시네마4D, 에프터이펙트, 3D 블렌더, 클립스튜디오 국비지원 학원."
              />
              <meta property="og:type" content="website" />
              <meta property="og:title" content="H ACADEMY | 에이치 아카데미" />
              <meta
                property="og:description"
                content="모션그래픽, 웹툰, 이모티콘, 시네마4D, 에프터이펙트, 3D 블렌더, 클립스튜디오 국비지원 학원."
              />
              {/* <meta
                property="og:image"
                content="http://www.mysite.com/myimage.jpg"
              />
              <meta property="og:url" content="http://www.mysite.com" /> */}
            </Head>

            <Component {...pageProps} />
          </Layout>
        </NextUIProvider>
      </RecoilRoot>
    </ApolloProvider>
  )
}
