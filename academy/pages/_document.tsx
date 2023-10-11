import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>H-Class | 하이클래스</title>
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="//cdn.example.com/path/to/additional-styles.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
