import Document, { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-WP8Q4MBES6`}
          />
          <script
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
          /> */}
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
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-WP8Q4MBES6" />
        <Script id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-WP8Q4MBES6');
        `}
        </Script>

        <Script>
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W22FF3RM');  `}
        </Script>
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
