import Form from '@/components/Form'
import DetailFixed from '@/components/section/DetailFixed'

export default function Detail() {
  return (
    <>
      <section>
        <div className="max-w-[2000px] mx-auto my-0">
          <img
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/detail/emoticon01.webp"
            alt="emoticon"
            className="hidden w-full wmd:block"
          ></img>
          <img
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/detail/emoticon01_mo.webp"
            alt="emoticon"
            className="block w-full wmd:hidden"
          ></img>
        </div>
      </section>
      <section id="consult" className="pb-20">
        <Form />
      </section>
      <DetailFixed
        title={`📣 당신도 💰억대매출💰 이모티콘 크리에이터!!`}
        description={`H ACADEMY 스페셜 강사진의 1:1 개인 피드백을 통해 이모티콘 크리에이터로 데뷔🔥`}
      />
    </>
  )
}
