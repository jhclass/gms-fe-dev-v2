import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
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
          pagination={{ clickable: true, el: '.main_visual_mo_pager' }}
          modules={[Autoplay, Pagination]}
          className="mySwiper2"
        >
          <SwiperSlide>
            <div className="flex justify-center">
              <figure className="absolute w-[59.2593vw] bottom-0 left-0">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/mo/main_banner01_tit.webp"
                  alt="영상편집&제작 2D/3D 모션그래픽 취업과정 과정상세보기"
                />
              </figure>
              <video autoPlay loop muted poster="썸네일경로">
                <source
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/mo/main_banner01.mp4"
                  type="video/mp4"
                />
              </video>
              <figure className="absolute z-[6] w-[28.7037vw] bottom-[11.1111vw] right-[8.3333vw]">
                <Link href="/detail/webtoon">
                  <img src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/mo/main_banner01_btn.webp" />
                </Link>
              </figure>
            </div>
          </SwiperSlide>
        </Swiper>
        <button className="main_prev w-[10%] absolute top-[50%] left-0 z-[5] -translate-y-[50%]">
          <img src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/mo/main_banner_btn.png" />
        </button>
        <button className="rotate-180  w-[10%] main_next absolute top-[50%] right-0 z-[5] -translate-y-[50%]">
          <img src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/mo/main_banner_btn.png" />
        </button>
      </div>
    </>
  )
}
