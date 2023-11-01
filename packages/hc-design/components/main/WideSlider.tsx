import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Link from 'next/link'

export default function MainSilder() {
  const handleTest = e => {
    e.preventDefault()
    alert(`준비중입니다. 😊`)
  }
  return (
    <>
      <div className="relative">
        <Swiper
          autoplay={{
            delay: 3000,
          }}
          pagination={{ clickable: true, el: '.main_visual_pager' }}
          modules={[Autoplay, Pagination]}
          className="mySwiper1"
        >
          <SwiperSlide style={{ background: '#000' }}>
            <Link href="#" onClick={handleTest}>
              <div className="flex justify-end wrap">
                <img
                  src="/src/images/main_03.webp"
                  style={{ overflow: 'hidden' }}
                  className="hidden lg:block"
                />
                <img
                  src="/src/images/main_03_m.jpg"
                  style={{ overflow: 'hidden' }}
                  className="block lg:hidden"
                />
                <div className="absolute top-[48%] left-6 xl:left-0 translate-y-[-50%]">
                  <p className="inline px-3 py-2 text-center text-white rounded-r-lg rounded-tl-lg text-sm/none md:text-lg bg-primary">
                    신규모집
                  </p>
                  <h2 className="mt-4 text-2xl font-bold text-white md:text-4xl/tight">
                    새로운 신드롬,
                    <br />
                    ChatGPT 강의 시리즈
                  </h2>
                  <p className="mt-4 text-white text-md/tight md:text-xl/tight">
                    지금 내게 필요한
                    <br />
                    ChatGPT 강의를 살펴 보세요.
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide style={{ background: '#332314' }}>
            <Link href="#" onClick={handleTest}>
              <div className="flex justify-end wrap">
                <img
                  src="/src/images/main_02.webp"
                  style={{ overflow: 'hidden' }}
                  className="hidden lg:block"
                />
                <img
                  src="/src/images/main_02_m.jpg"
                  style={{ overflow: 'hidden' }}
                  className="block lg:hidden"
                />
                <div className="absolute top-[48%] left-6 xl:left-0 translate-y-[-50%]">
                  <p className="inline px-3 py-2 text-center text-white rounded-r-lg rounded-tl-lg text-sm/none md:text-lg bg-primary">
                    신규모집
                  </p>
                  <h2 className="mt-4 text-2xl font-bold text-white md:text-4xl/tight">
                    권오상의 금융아카데미
                    <br />단 5일간의 특별전
                  </h2>
                  <p className="mt-4 text-white text-md/tight md:text-xl/tight">
                    단과 강의 쿠폰부터
                    <br />
                    PASS 특별 할인까지 (~10/27)
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide style={{ background: '#0c0918' }}>
            <Link href="#" onClick={handleTest}>
              <div className="flex justify-end wrap">
                <img
                  src="/src/images/main_04.webp"
                  style={{ overflow: 'hidden' }}
                  className="hidden lg:block"
                />
                <img
                  src="/src/images/main_04_m.jpg"
                  style={{ overflow: 'hidden' }}
                  className="block lg:hidden"
                />
                <div className="absolute top-[48%] left-6 xl:left-0 translate-y-[-50%]">
                  <p className="inline px-3 py-2 text-center text-white rounded-r-lg rounded-tl-lg text-sm/none md:text-lg bg-primary">
                    신규모집
                  </p>
                  <h2 className="mt-4 text-2xl font-bold text-white md:text-4xl/tight">
                    프론트엔드 개발자를 위한
                    <br />
                    고성능 대규모 프로젝트
                  </h2>
                  <p className="mt-4 text-white text-md/tight md:text-xl/tight">
                    고퀄리티 10개 프로젝트로
                    <br />
                    최적화부터 유지보수까지
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide style={{ background: '#b1dcff' }}>
            <Link href="#" onClick={handleTest}>
              <div className="flex justify-end wrap">
                <img
                  src="/src/images/main_05.png"
                  style={{ overflow: 'hidden' }}
                  className="hidden lg:block"
                />
                <img
                  src="/src/images/main_05_m.jpg"
                  style={{ overflow: 'hidden' }}
                  className="block lg:hidden"
                  width="100%"
                  height="100%"
                />
                <div className="absolute top-[48%] left-6 xl:left-0 translate-y-[-50%]">
                  <p className="inline px-3 py-2 text-center text-white rounded-r-lg rounded-tl-lg text-sm/none md:text-lg bg-primary">
                    신규모집
                  </p>
                  <h2 className="mt-4 text-2xl font-bold text-black md:text-4xl/tight">
                    코딩이 이렇게 쉬워?
                    <br />
                    코딩 스텝원
                  </h2>
                  <p className="mt-4 text-black text-md/tight md:text-xl/tight">
                    국비지원으로 듣는 0원 코딩 강의
                    <br />
                    11월 7일까지 모집!
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide style={{ background: '#eee' }}>
            <Link href="#" onClick={handleTest}>
              <div className="flex justify-end wrap">
                <img
                  src="/src/images/main_01.webp"
                  style={{ overflow: 'hidden' }}
                  className="hidden lg:block"
                />
                <img
                  src="/src/images/main_01_m.jpg"
                  style={{ overflow: 'hidden' }}
                  className="block lg:hidden"
                />
                <div className="absolute top-[48%] left-6 xl:left-0 translate-y-[-50%]">
                  <p className="inline px-3 py-2 text-center text-white rounded-r-lg rounded-tl-lg text-sm/none md:text-lg bg-primary">
                    신규모집
                  </p>
                  <h2 className="mt-4 text-2xl font-bold text-black md:text-4xl/tight">
                    직무 트렌드 추천 강의
                    <br />
                    5일 한정 BIG SALE
                  </h2>
                  <p className="mt-4 text-black text-md/tight md:text-xl/tight">
                    마지막 10주년 특가를
                    <br />
                    지금 바로 잡아보세요!
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide style={{ background: '#150042' }}>
            <Link href="#" onClick={handleTest}>
              <div className="flex justify-end wrap">
                <img
                  src="/src/images/main_06.png"
                  style={{ overflow: 'hidden' }}
                  className="hidden lg:block"
                />
                <img
                  src="/src/images/main_06_m.jpg"
                  style={{ overflow: 'hidden' }}
                  className="block lg:hidden"
                />
                <div className="absolute top-[48%] left-6 xl:left-0 translate-y-[-50%]">
                  <p className="inline px-3 py-2 text-center text-white rounded-r-lg rounded-tl-lg text-sm/none md:text-lg bg-primary">
                    신규모집
                  </p>
                  <h2 className="mt-4 text-2xl font-bold text-white md:text-4xl/tight">
                    AI 시대 일잘러를 위한
                    <br />
                    ChatGPT 활용법
                  </h2>
                  <p className="mt-4 text-white text-md/tight md:text-xl/tight">
                    400가지 활용 사례를 다- 담은 강의
                    <br />
                    ChatGPT, 너 내 동료가 돼라!
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        </Swiper>
        <div className="wrap">
          <div className="absolute left-0 z-30 w-full px-6 text-center lg:px-6 xl:px-0 -bottom-7 md:bottom-5">
            <div className="main_visual_pager"></div>
          </div>
        </div>
      </div>
    </>
  )
}
