import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Link from 'next/link'

export default function ListSlider({ slideNo }) {
  const list = [
    {
      title: '웹툰작가에게 배우는 웹툰제작과정 Webtoon',
      img: '/src/detail/d2_thumb02.jpg',
      subs: '프론트엔드 입문자를 위한 개념부터 프로젝트까지 한번에 배우는 자바스크립트',
      link: '/detail/2',
    },
    {
      title: '웹툰작가에게 배우는 웹툰제작과정 Webtoon',
      img: '/src/detail/d2_thumb03.jpg',
      subs: '프론트엔드 입문자를 위한 개념부터 프로젝트까지 한번에 배우는 자바스크립트',
      link: '/detail/3',
    },
    {
      title: '웹 프론트엔드를 위한 자바스크립트 첫 걸음',
      img: '/src/images/thumb04.jpg',
      subs: '프론트엔드 입문자를 위한 개념부터 프로젝트까지 한번에 배우는 자바스크립트',
      link: '/detail/1',
    },
    {
      title: '웹 프론트엔드를 위한 자바스크립트 첫 걸음',
      img: '/src/images/thumb05.jpg',
      subs: '프론트엔드 입문자를 위한 개념부터 프로젝트까지 한번에 배우는 자바스크립트',
      link: '/detail/1',
    },
    {
      title: '웹 프론트엔드를 위한 자바스크립트 첫 걸음',
      img: '/src/images/thumb06.jpg',
      subs: '프론트엔드 입문자를 위한 개념부터 프로젝트까지 한번에 배우는 자바스크립트',
      link: '/detail/1',
    },
    {
      title: '웹 프론트엔드를 위한 자바스크립트 첫 걸음',
      img: '/src/images/thumb07.jpg',
      subs: '프론트엔드 입문자를 위한 개념부터 프로젝트까지 한번에 배우는 자바스크립트',
      link: '/detail/1',
    },
    {
      title: '웹 프론트엔드를 위한 자바스크립트 첫 걸음',
      img: '/src/images/thumb08.jpg',
      subs: '프론트엔드 입문자를 위한 개념부터 프로젝트까지 한번에 배우는 자바스크립트',
      link: '/detail/1',
    },
    {
      title: '웹 프론트엔드를 위한 자바스크립트 첫 걸음',
      img: '/src/images/thumb09.jpg',
      subs: '프론트엔드 입문자를 위한 개념부터 프로젝트까지 한번에 배우는 자바스크립트',
      link: '/detail/1',
    },
    {
      title: '웹 프론트엔드를 위한 자바스크립트 첫 걸음',
      img: '/src/images/thumb10.jpg',
      subs: '프론트엔드 입문자를 위한 개념부터 프로젝트까지 한번에 배우는 자바스크립트',
      link: '/detail/1',
    },
    {
      title: '웹 프론트엔드를 위한 자바스크립트 첫 걸음',
      img: '/src/images/thumb11.jpg',
      subs: '프론트엔드 입문자를 위한 개념부터 프로젝트까지 한번에 배우는 자바스크립트',
      link: '/detail/1',
    },
  ]
  return (
    <>
      <div className={`relative list_slider_${slideNo} max-w-[1440px] mx-auto`}>
        <Swiper
          slidesPerView={1.5}
          spaceBetween={20}
          navigation={{
            prevEl: `.list_slider_${slideNo} .slide_prev`,
            nextEl: `.list_slider_${slideNo} .slide_next`,
          }}
          modules={[Navigation]}
          breakpoints={{
            640: {
              slidesPerView: 2.3,
            },
            960: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
          className="!px-5 xl:!px-0"
        >
          {list.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="">
                <Link href={item.link}>
                  <div className="relative overflow-hidden rounded-r-xl rounded-tl-xl">
                    <img alt={item.title} src={item.img} />
                  </div>
                  <div className="absolute top-0 flex flex-wrap gap-1 left-[0.5rem]">
                    <span className="px-2 py-1 text-center text-white rounded-r-lg rounded-tl-lg font-base text-[0.9rem] bg-primary">
                      HOT
                    </span>
                    <span className="px-2 py-1 text-center text-white rounded-r-lg rounded-tl-lg font-base text-[0.9rem] bg-flag3">
                      NEW
                    </span>
                    <span className="px-2 py-1 text-center text-white rounded-r-lg rounded-tl-lg font-base text-[0.9rem] bg-flag1">
                      국비지원
                    </span>
                    <span className="px-2 py-1 text-center text-white rounded-r-lg rounded-tl-lg font-base text-[0.9rem] bg-flag2">
                      커리어패스
                    </span>
                  </div>
                  <dl className="w-full h-full py-3">
                    <dd className="text-xl text-black font-bold min-h-[3rem] line-clamp-2">
                      {item.title}
                    </dd>
                    <dd className="mt-2 text-base line-clamp-2 text-zinc-600">
                      {item.subs}
                    </dd>
                  </dl>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="hidden absolute top-[-3rem] right-0 lg:flex">
          <button className="p-1 text-2xl text-primary slide_prev">
            <i className="xi-angle-left-min" />
          </button>
          <button className="p-1 text-2xl text-primary slide_next">
            <i className="xi-angle-right-min" />
          </button>
        </div>
      </div>
    </>
  )
}
