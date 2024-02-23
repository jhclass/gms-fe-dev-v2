import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
  render() {
    return (
      <Html>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
          <meta
            name="naver-site-verification"
            content="b4b50776b3b55da6f0bf7cec11cf908a2da0cf1f"
          />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css"
          />
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
        <body>
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-W22FF3RM"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
