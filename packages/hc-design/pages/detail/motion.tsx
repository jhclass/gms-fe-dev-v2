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
        title={`📣 영상 속 다양한 움직임과 효과를 주는 모션그래픽!!`}
        description={`에프터이펙트, 에프터아이, 스네마4D, 블렌더 등을 활용한 영상 전문가를 양성합니다⭐️`}
      />
    </>
  )
}
