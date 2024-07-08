import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function MainSilder() {
  return (
    <>
      <div className="relative max-w-[2000px] mx-auto my-0">
        <Swiper
          autoplay={{
            delay: 5000,
          }}
          loop={true}
          navigation={{ nextEl: '.main_next', prevEl: '.main_prev' }}
          modules={[Autoplay, Navigation]}
          className="mySwiper1"
        >
          <SwiperSlide>
            <Link href="/lectures/webtoon1">
              <div className="relative flex justify-center">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/main_banner07.webp"
                  alt="Stable Diffusion X Midjourney  
                  산대특과정이라고 들어봤어? 아직도 모르고 있었니? 웹툰작가 되고싶지? 우리는 (주)RS미디어랑 친해 언제 시작할래? AI 도 같이 사용한데 지금해야되!
                  웹툰 & 무빙툰 작가데뷔 정규과정 매달 훈련 장려금 816,000원!!
                  커리큘럼 자세히보기
                  "
                />
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href="/lectures/motion1">
              <div className="relative flex justify-center">
                <figure className="absolute w-full top-0 left-[50%] -translate-x-[50%] z-10">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/main_banner08_tit.webp"
                    alt="Stable Diffusion x Motion 커리큘럼 자세히보기"
                  />
                </figure>
                <div className="relative w-full max-w-[2000px] overflow-hidden">
                  <div className="relative w-full pb-[36%] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                    <iframe
                      id="youtube-iframe"
                      src="https://www.youtube.com/embed/0ZdC1SJR2SE?start=3&autoplay=1&loop=1&mute=1&playlist=0ZdC1SJR2SE&controls=0&modestbranding=1&rel=0"
                      title="Stable Diffusion x Motion 커리큘럼 자세히보기"
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      className="scale-[1.1]"
                      style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                      }}
                    ></iframe>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href="/event/summerVacation">
              <div className="relative flex justify-center">
                <video playsInline autoPlay loop muted>
                  <source
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/main_banner06.mp4"
                    type="video/mp4"
                  />
                  <span className="hidden">7월 너의 여름방학</span>
                </video>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href="/event/kdtJava">
              <div className="relative flex justify-center">
                <figure className="absolute w-full top-0 left-[50%] -translate-x-[50%]">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/main_banner04_tit.webp"
                    alt="AI분석 및 활용  백엔드 JAVA 개발자 hacademy & 고용노동부 백엔드 풀스택 JAVA개발자 취업티켓!! K-Digital트레이닝 훈련명 : 인공지능 트랜스포메이션을
                위한 플랫폼 개발자 양성과정 과정상세보기"
                  />
                </figure>
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/main_banner04_poster.webp"
                  alt="AI분석 및 활용  백엔드 JAVA 개발자 hacademy & 고용노동부 백엔드 풀스택 JAVA개발자 취업티켓!! K-Digital트레이닝 훈련명 : 인공지능 트랜스포메이션을
                위한 플랫폼 개발자 양성과정"
                />
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href="/motiongraphic">
              <div className="relative flex justify-center">
                <figure className="absolute w-full top-0 left-[50%] -translate-x-[50%]">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/main_banner01_tit.webp"
                    alt="영상편집&제작 2D/3D 모션그래픽 취업과정 과정상세보기"
                  />
                </figure>
                <video
                  playsInline
                  autoPlay
                  loop
                  muted
                  poster="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/main_banner01_poster.webp"
                >
                  <source
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/main_banner01.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href="/webtoon">
              <div className="relative flex justify-center">
                <figure className="absolute w-full top-0 left-[50%] -translate-x-[50%] ">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/main_banner02_tit.webp"
                    alt="웹툰작가에게 배우는 webtoon 과정상세보기"
                  />
                </figure>
                <video
                  playsInline
                  autoPlay
                  loop
                  muted
                  poster="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/main_banner02_poster.webp"
                >
                  <source
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/main_banner02.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href="/artwork/emoticon">
              <div className="relative flex justify-center">
                <figure className="absolute w-full top-0 left-[50%] -translate-x-[50%] ">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/main_banner03_tit.webp"
                    alt="5주 완성! 이모티콘 크리에이터 되기! 배우는 webtoon 과정상세보기"
                  />
                </figure>
                <video
                  playsInline
                  autoPlay
                  loop
                  muted
                  poster="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/main_banner03_poster.webp"
                >
                  <source
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/main_banner03.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </Link>
          </SwiperSlide>
        </Swiper>
        <button className="main_prev w-[4vw] absolute top-[50%] left-0 z-[5] -translate-y-[50%]">
          <img
            className="w-full"
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/main_banner_btn.webp"
          />
        </button>
        <button className="rotate-180 w-[4vw] main_next absolute top-[50%] right-0 z-[5] -translate-y-[50%]">
          <img
            className="w-full"
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/main_banner_btn.webp"
          />
        </button>
      </div>
    </>
  )
}
