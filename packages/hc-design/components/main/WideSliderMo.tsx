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
            <Link href="/detail/webtoon">
              <div className="flex justify-center">
                <img src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/mo/main_banner01.png" />
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href="/detail/webtoon">
              <div className="flex justify-center">
                <img src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/mo/main_banner01.png" />
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href="/detail/webtoon">
              <div className="flex justify-center">
                <img src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/mo/main_banner01.png" />
              </div>
            </Link>
          </SwiperSlide>
        </Swiper>
        <div className="wrap">
          <SwiperPager>
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/icon/mo/main_visual_pager.png"
              alt=""
            />
            <div className="main_visual_mo_pager"></div>
          </SwiperPager>
        </div>
        <SwiperDeco>
          <img
            src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/mainBnr/mo/main_deco.png"
            alt=""
          />
        </SwiperDeco>
      </div>
    </>
  )
}
