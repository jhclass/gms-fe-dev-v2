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
              <title>H ACADEMY | 에이치 아카데미</title>
              <script src="https://www.googletagmanager.com/gtag/js?id=G-WP8Q4MBES6" />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
            (function(w, d, s, l, i) {
              w[l] = w[l] || [];
              w[l].push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
              });
              var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
              j.async = true;
              j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
              f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', 'GTM-W22FF3RM');
          `,
                }}
              />
              <script
                id="google-analytics"
                dangerouslySetInnerHTML={{
                  __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag() {
                dataLayer.push(arguments);
              }
              gtag('js', new Date());
              gtag('config', 'G-WP8Q4MBES6');
            `,
                }}
              />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
              />
            </Head>
            <Component {...pageProps} />
          </Layout>
        </NextUIProvider>
      </RecoilRoot>
    </ApolloProvider>
  )
}
