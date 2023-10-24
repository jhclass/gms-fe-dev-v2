import "@/styles/global.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout/Layout";
import { NextUIProvider } from "@nextui-org/react";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/lib/apolloClient";
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <NextUIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NextUIProvider>
    </ApolloProvider>
  );
}
