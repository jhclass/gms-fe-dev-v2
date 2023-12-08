import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/swiper-bundle.css'

export default function Portfolio() {
  const list = [
    {
      title: '1',
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_it/eximg/de_sec5_con01.webp',
      text1: '취업&이직을 위한',
      text2: '자기소개서 작성 꿀팁',
    },
    {
      title: '2',
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_it/eximg/de_sec5_con02.webp',
      text1: '면접관 눈을 사로잡는',
      text2: '매력적인 포트폴리오 제작 방법',
    },
    {
      title: '3',
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_it/eximg/de_sec5_con03.webp',
      text1: '면사전 과제 &기술 면접',
      text2: '대비 노하우',
    },
    {
      title: '4',
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_it/eximg/de_sec5_con04.webp',
      text1: '공식 문서로',
      text2: '부족한 부분 채우는 효과적인 방법',
    },
    {
      title: '5',
      img: 'https://highclass-image.s3.amazonaws.com/academy/hc_it/eximg/de_sec5_con05.webp',
      text1: '빠르게 변하는 프론트엔드 환경에서',
      text2: '트렌디한 기술 학습&중심잡기 노하우',
    },
  ]
  return (
    <>
      <div className="overflow-hidden xl:overflow-visible wrap">
        <div className="text-center">
          <p className="inline-block px-4 py-2 mb-5 text-sm font-bold text-center text-white bg-black border-2 border-black rounded-lg">
            POINT 2
          </p>
          <h4 className="text-center text-black">
            <span className="text-2xl">
              프론트엔드 개발자, 그리고 예비 프론트엔드 개발자를 위한
            </span>
            <br />
            <b className="mt-4 text-2xl">
              찐으로 도움 되는 선배의 노하우 흡수하기
            </b>
          </h4>
          <p className="mt-5 text-base text-zinc-600">
            Next.js만 배우고 끝나면 섭섭하죠!
            <br />
            오직 프론트엔드 개발자를 위한 취업&이직 준비 방법과,
            <br />
            문제해결력을 기를 수 있는 학습방법도 함께 전수해 드려요.😎
          </p>
        </div>

        <div className="relative mt-10 detail-slide1">
          <Swiper
            slidesPerView={1}
            navigation={{
              prevEl: '.detail-slide1 .slide_prev',
              nextEl: '.detail-slide1 .slide_next',
            }}
            modules={[Navigation]}
            className="mySwiper"
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              960: {
                slidesPerView: 3,
              },
            }}
          >
            {list.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="px-5">
                  <figure>
                    <img alt={item.title} src={item.img} />
                  </figure>
                  <p className="mt-3 text-base text-center text-black">
                    {item.text1}
                    <br />
                    {item.text2}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button className="absolute left-[-2rem] top-[50%] mt-[-1.5rem] p-1 text-5xl text-black slide_prev">
            <i className="xi-angle-left-min" />
          </button>
          <button className="absolute right-[-2rem] top-[50%] mt-[-1.5rem] p-1 text-5xl text-black slide_next">
            <i className="xi-angle-right-min" />
          </button>
        </div>
        <p className="mt-10 text-lg text-center text-black">
          30가지 이상의 기본&심화 기능 학습과 구현 실습을 동시에!
          <br />약 15시간 분량의 집중 공략 강의로, Next.js를 마스터 해보세요.
        </p>
      </div>
    </>
  )
}
