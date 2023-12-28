import Form from '@/components/Form'
import DetailFixed from '@/components/section/DetailFixed'

export default function Detail() {
  return (
    <>
      <section>
        <div className="max-w-[2000px] mx-auto my-0">
          <img
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/detail/webtoon01.webp"
            alt="webtoon"
            className="hidden w-full wmd:block"
          ></img>
          <img
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/detail/webtoon01_mo.webp"
            alt="webtoon"
            className="block w-full wmd:hidden"
          ></img>
        </div>
      </section>
      <section id="consult" className="pb-20">
        <Form />
      </section>
      <DetailFixed
        title={`📣 웹툰작가가 될 수 있는 기회 놓치지 마세요!!`}
        description={`드로잉의 이해부터 단편웹툰 제작까지! H ACADEMY 최고의 강사진이 웹툰의 모든것을 알려드립니다⭐️`}
      />
    </>
  )
}
