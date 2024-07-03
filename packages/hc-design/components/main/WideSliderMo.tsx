import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const SwiperPager = styled.div`
  width: 8rem;
  position: absolute;
  bottom: 6rem;
  right: 2.5rem;
  z-index: 10;
  text-align: center;

  .swiper-pagination-bullet {
    background: #fff;
    opacity: 1;
  }
  .swiper-pagination-bullet-active {
    background: #c9f237;
  }
`

const SwiperDeco = styled.div`
  width: 60%;
  position: absolute;
  bottom: 3.5rem;
  left: 0;
  z-index: 20;
`

export default function WideSliderMo() {
  return (
    <>
      <div className="relative">
        <Swiper
          autoplay={{
            delay: 5000,
          }}
          loop={true}
          navigation={{ nextEl: '.main_next', prevEl: '.main_prev' }}
          modules={[Autoplay, Navigation]}
          className="mySwiper2"
        >
          <SwiperSlide>
            <div className="flex justify-center">
              <Link href="/lectures/webtoon1">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/mo/main_banner07.webp"
                  alt="Stable Diffusion X Midjourney  
                  웹툰 & 무빙툰 작가데뷔 정규과정 매달 훈련 장려금 816,000원!!
                  커리큘럼 자세히보기 click
                  "
                />
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-center">
              <Link href="/event/summerVacation">
                <video playsInline autoPlay loop muted>
                  <source
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/mo/main_banner06.mp4"
                    type="video/mp4"
                  />
                  <span className="hidden">7월 너의 여름방학</span>
                </video>
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-center">
              <Link href="/event/kdtJava">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/mo/main_banner04.webp"
                  alt="AI분석 및 활용  백엔드 JAVA 개발자 hacademy & 고용노동부 백엔드 풀스택 JAVA개발자 취업티켓!! K-Digital트레이닝 훈련명 : 인공지능 트랜스포메이션을
                위한 플랫폼 개발자 양성과정 과정상세보기"
                />
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-center">
              <figure className="absolute w-[59.2593vw] bottom-0 left-0">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/mo/main_banner01_tit.webp"
                  alt="영상편집&제작 2D/3D 모션그래픽 취업과정 과정상세보기"
                />
              </figure>
              <video
                playsInline
                autoPlay
                loop
                muted
                poster="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/mo/main_banner01_poster.webp"
              >
                <source
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/mo/main_banner01.mp4"
                  type="video/mp4"
                />
              </video>
              <figure className="absolute z-[6] w-[28.7037vw] bottom-[11.1111vw] right-[8.3333vw]">
                <Link href="/motiongraphic">
                  <img src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/mo/main_banner01_btn.webp" />
                </Link>
              </figure>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-center">
              <figure className="absolute w-[59.2593vw] bottom-0 left-0">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/mo/main_banner02_tit.webp"
                  alt="웹툰작가에게 배우는 webtoon 과정상세보기"
                />
              </figure>
              <video playsInline autoPlay loop muted>
                <source
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/mo/main_banner02.mp4"
                  type="video/mp4"
                />
              </video>
              <figure className="absolute z-[6] w-[28.7037vw] bottom-[11.1111vw] right-[8.3333vw]">
                <Link href="/webtoon">
                  <img src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/mo/main_banner01_btn.webp" />
                </Link>
              </figure>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-center">
              <figure className="absolute w-[59.2593vw] bottom-0 left-0">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/mo/main_banner03_tit.webp"
                  alt="5주 완성! 이모티콘 크리에이터 되기! 배우는 webtoon 과정상세보기"
                />
              </figure>
              <video playsInline autoPlay loop muted>
                <source
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/mo/main_banner03.mp4"
                  type="video/mp4"
                />
              </video>
              <figure className="absolute z-[6] w-[28.7037vw] bottom-[11.1111vw] right-[8.3333vw]">
                <Link href="/artwork/emoticon">
                  <img src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/mo/main_banner01_btn.webp" />
                </Link>
              </figure>
            </div>
          </SwiperSlide>
        </Swiper>
        <button className="main_prev z-[10] w-[10%] absolute top-[50%] left-0  -translate-y-[50%]">
          <img src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/mo/main_banner_btn.webp" />
        </button>
        <button className="rotate-180  w-[10%] main_next absolute top-[50%] right-0 z-[10] -translate-y-[50%]">
          <img src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/mo/main_banner_btn.webp" />
        </button>
      </div>
    </>
  )
}
