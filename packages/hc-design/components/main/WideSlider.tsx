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
            <Link href="/event/summerVacation">
              <div className="relative flex justify-center">
                <video playsInline autoPlay loop muted>
                  <source
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/main_banner05.mp4"
                    type="video/mp4"
                  />
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
