import Form from '@/components/Form'
import Head from 'next/head'

export default function Consult() {
  return (
    <>
      <Head>
        <title>HART | 위치조회</title>
        <meta name="description" content="위치조회" />
      </Head>
      <section id="consult" className="pb-16">
        <img
          src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/center_top.webp"
          alt="HighClass"
          className="block w-full wmd:hidden"
        />
        <img
          src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/center_location.gif"
          alt="HighClass"
          className="block w-full wmd:hidden"
        />
        <div className="max-w-[2000px] mx-auto my-0 relative">
          <img
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/center_top.webp"
            alt="HighClass"
            className="hidden w-ful wmd:block"
          />
          <img
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/center_location.gif"
            alt="HighClass"
            className="hidden w-ful wmd:block"
          />
        </div>
        <Form />
      </section>
    </>
  )
}
