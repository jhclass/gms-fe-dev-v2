import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function MainSilder() {
  return (
    <>
      <div className="relative">
        <Swiper
          autoplay={{
            delay: 5000,
          }}
          pagination={{ clickable: true, el: '.main_visual_pager' }}
          modules={[Autoplay, Pagination]}
          className="mySwiper1"
        >
          <SwiperSlide>
            <Link href="/detail/webtoon">
              <div className="flex justify-center">
                <video autoPlay loop muted className="hidden wmd:block">
                  <source
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/main/main_banner02.mp4"
                    type="video/mp4"
                  />
                </video>
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/main/main_banner02_mo.webp"
                  style={{ overflow: 'hidden' }}
                  className="block wmd:hidden"
                />
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href="/detail/emoticon">
              <div className="flex justify-center">
                <video autoPlay loop muted className="hidden wmd:block">
                  <source
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/main/main_banner03.mp4"
                    type="video/mp4"
                  />
                </video>
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/main/main_banner03_mo.webp"
                  style={{ overflow: 'hidden' }}
                  className="block wmd:hidden"
                />
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href="/detail/motion">
              <div className="flex justify-center">
                <video autoPlay loop muted className="hidden wmd:block">
                  <source
                    src="https://highclass-image.s3.amazonaws.com/academy/hc_design/main/main_banner01.mp4"
                    type="video/mp4"
                  />
                </video>
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/main/main_banner01_mo.webp"
                  style={{ overflow: 'hidden' }}
                  className="block wmd:hidden"
                />
              </div>
            </Link>
          </SwiperSlide>
          {/* <SwiperSlide style={{ background: '#eee' }}>
            <Link href="#" onClick={handleTest}>
              <div className="flex justify-end wrap">
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/eximg/main_01.webp"
                  style={{ overflow: 'hidden' }}
                  className="hidden lg:block"
                />
                <img
                  src="https://highclass-image.s3.amazonaws.com/academy/hc_design/eximg/main_01_m.webp"
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
          </SwiperSlide> */}
        </Swiper>
        <div className="wrap">
          <div className="absolute left-0 z-30 w-full px-6 text-center lg:px-6 xl:px-0 -bottom-8">
            <div className="main_visual_pager"></div>
          </div>
        </div>
      </div>
    </>
  )
}
