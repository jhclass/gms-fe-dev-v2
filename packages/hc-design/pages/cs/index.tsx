import Form from '@/components/Form'

export default function Consult() {
  return (
    <>
      <section id="consult" className="pb-16">
        <img
          src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/mo/center_top.webp"
          alt="HighClass"
          className="block w-full wmd:hidden"
        />
        <div className="wrap">
          <img
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/page/center_top.webp"
            alt="HighClass"
            className="hidden w-ful wmd:block"
          />
        </div>
        <Form />
      </section>
    </>
  )
}
