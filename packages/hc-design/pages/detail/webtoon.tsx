import Form from '@/components/Form'

export default function Detail() {
  return (
    <>
      <section>
        <div className="max-w-[2000px] mx-auto my-0">
          <img
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/detail/webtoon01.jpg"
            alt="webtoon"
          ></img>
        </div>
      </section>
      <section id="consult" className="pb-20">
        <Form />
      </section>
    </>
  )
}
