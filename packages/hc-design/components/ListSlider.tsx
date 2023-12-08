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
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/detail/02/d2_thumb03.webp',
      subs: '본인이 만든 스토리의 프롤로그를 만들어 봅니다. 수차례원고를 거듭하면서 원고에 시작과 마무리에 대한 감을 익힙니다.',
      link: '/detail/2',
    },
    {
      title:
        '이모티콘 제작 생동감 있는 감정표현으로5주 만의 이모티콘 크리에이터 되기',
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/detail/03/d3_thumb01.webp',
      subs: '카카오톡, 라인, 오지큐, 모히톡 등 플랫폼마다 파일크기와 비율이 다르기 때문에 플랫폼별 특징을 이해하고 형식에 맞춰 이식하는 방법을 체험하고 이모티콘 승인을 위한 포인트 및 노하우를 배울 수 있습니다.',
      link: '/detail/3',
    },
    {
      title: '웹 프론트엔드를 위한 자바스크립트 첫 걸음',
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/eximg/thumb04.webp',
      subs: '프론트엔드 입문자를 위한 개념부터 프로젝트까지 한번에 배우는 자바스크립트',
      link: '/detail/1',
    },
    {
      title: '웹 프론트엔드를 위한 자바스크립트 첫 걸음',
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/eximg/thumb05.webp',
      subs: '프론트엔드 입문자를 위한 개념부터 프로젝트까지 한번에 배우는 자바스크립트',
      link: '/detail/1',
    },
    {
      title: '웹 프론트엔드를 위한 자바스크립트 첫 걸음',
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/eximg/thumb06.webp',
      subs: '프론트엔드 입문자를 위한 개념부터 프로젝트까지 한번에 배우는 자바스크립트',
      link: '/detail/1',
    },
    {
      title: '웹 프론트엔드를 위한 자바스크립트 첫 걸음',
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/eximg/thumb07.webp',
      subs: '프론트엔드 입문자를 위한 개념부터 프로젝트까지 한번에 배우는 자바스크립트',
      link: '/detail/1',
    },
    {
      title: '웹 프론트엔드를 위한 자바스크립트 첫 걸음',
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/eximg/thumb08.webp',
      subs: '프론트엔드 입문자를 위한 개념부터 프로젝트까지 한번에 배우는 자바스크립트',
      link: '/detail/1',
    },
    {
      title: '웹 프론트엔드를 위한 자바스크립트 첫 걸음',
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/eximg/thumb09.webp',
      subs: '프론트엔드 입문자를 위한 개념부터 프로젝트까지 한번에 배우는 자바스크립트',
      link: '/detail/1',
    },
    {
      title: '웹 프론트엔드를 위한 자바스크립트 첫 걸음',
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/eximg/thumb10.webp',
      subs: '프론트엔드 입문자를 위한 개념부터 프로젝트까지 한번에 배우는 자바스크립트',
      link: '/detail/1',
    },
    {
      title: '웹 프론트엔드를 위한 자바스크립트 첫 걸음',
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_design/eximg/thumb11.webp',
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
