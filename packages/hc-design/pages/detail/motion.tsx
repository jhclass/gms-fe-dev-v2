import Form from '@/components/Form'
import DetailFixed from '@/components/section/DetailFixed'

export default function Detail() {
  return (
    <>
      <section>
        <div className="max-w-[2000px] mx-auto my-0">
          <img
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/detail/motion01.webp"
            alt="motion"
            className="hidden lg:block"
          ></img>
          <img
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/detail/motion01_mo.webp"
            alt="motion"
            className="block lg:hidden"
          ></img>
        </div>
      </section>
      <section id="consult" className="pb-20">
        <Form />
      </section>
      <DetailFixed
        title={`📣 마지막 10주년 특가를 놓치지 마세요! (~10/27)`}
        description={`내용내용내용내용내용`}
      />
    </>
  )
}
