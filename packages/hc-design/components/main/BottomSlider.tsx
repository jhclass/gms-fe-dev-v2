import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'

const SwiperBox = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 100%;

  &:before {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 33.3333%;
    height: 100%;
    background: #fff;
    opacity: 0.8;
    z-index: 5;
  }
  &:after {
    position: absolute;
    top: 0;
    right: 0;
    content: '';
    width: 33.3333%;
    height: 100%;
    background: #fff;
    opacity: 0.8;
    z-index: 5;
  }

  @media (max-width: 768px) {
    &:after,
    &:before {
      display: none;
    }
  }
`

export default function MainSilder() {
  return (
    <>
      <SwiperBox>
        <Swiper
          autoplay={{
            delay: 3000,
          }}
          slidesPerView={1}
          loop={true}
          centeredSlides={true}
          modules={[Autoplay]}
          breakpoints={{
            768: {
              slidesPerView: 3,
            },
          }}
          className="mySwiper3"
        >
          <SwiperSlide>
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_bottom01.webp"
              alt="시설과환경"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_bottom02.webp"
              alt="시설과환경"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_bottom03.webp"
              alt="시설과환경"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_bottom04.webp"
              alt="시설과환경"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_bottom01.webp"
              alt="시설과환경"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_bottom02.webp"
              alt="시설과환경"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_bottom03.webp"
              alt="시설과환경"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://highclass-image.s3.amazonaws.com/academy/hc_design/2024/main/main_bottom04.webp"
              alt="시설과환경"
            />
          </SwiperSlide>
        </Swiper>
      </SwiperBox>
    </>
  )
}
