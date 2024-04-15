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
          navigation={{ nextEl: '.main_next', prevEl: '.main_prev' }}
          modules={[Autoplay, Navigation]}
          className="mySwiper1"
        >
          <SwiperSlide>
            <Link href="/motiongraphic">
              <div className="relative flex justify-center">
                <figure className="absolute w-full top-0 left-[50%] -translate-x-[50%]">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/main_banner01_tit.webp"
                    alt="영상편집&제작 2D/3D 모션그래픽 취업과정 과정상세보기"
                  />
                </figure>
                <video autoPlay loop muted poster="썸네일경로">
                  <source
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/main_banner01.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href="/motiongraphic">
              <div className="relative flex justify-center">
                <figure className="absolute w-full top-0 left-[50%] -translate-x-[50%] ">
                  <img
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/main_banner01_tit.webp"
                    alt="영상편집&제작 2D/3D 모션그래픽 취업과정 과정상세보기"
                  />
                </figure>
                <video autoPlay loop muted poster="썸네일경로">
                  <source
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/main_banner01.mp4"
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
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/main_banner_btn.png"
          />
        </button>
        <button className="rotate-180 w-[4vw] main_next absolute top-[50%] right-0 z-[5] -translate-y-[50%]">
          <img
            className="w-full"
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/main_banner_btn.png"
          />
        </button>
      </div>
    </>
  )
}
