import "@/styles/global.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import {NextUIProvider} from "@nextui-org/react";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NextUIProvider>
  );
}
