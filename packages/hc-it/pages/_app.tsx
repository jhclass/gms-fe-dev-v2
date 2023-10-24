import "@/styles/global.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout/Layout";
import { NextUIProvider } from "@nextui-org/react";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/lib/apolloClient";
import { RecoilRoot } from 'recoil';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <RecoilRoot>
        <NextUIProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NextUIProvider>
      </RecoilRoot>
    </ApolloProvider>
  );
}
