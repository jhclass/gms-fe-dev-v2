import "@/styles/global.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout/Layout";
import { NextUIProvider } from "@nextui-org/react";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/lib/apolloClient";
import { RecoilRoot } from 'recoil';
import Head from "next/head";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <RecoilRoot>
        <NextUIProvider>
          <Layout>
            <Head>
              <title>H-Class | 하이클래스</title>
            </Head>
            <Component {...pageProps} />
          </Layout>
        </NextUIProvider>
      </RecoilRoot>
    </ApolloProvider>
  );
}
