import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/swiper-bundle.css';

export default function Portfolio() {
  const list = [
    {
      title: "1",
      img: "/src/images/de_sec5_con01.webp",
    },
    {
      title: "2",
      img: "/src/images/de_sec5_con02.webp",
    },
    {
      title: "3",
      img: "/src/images/de_sec5_con03.webp",
    },
    {
      title: "4",
      img: "/src/images/de_sec5_con04.webp",
    },
    {
      title: "5",
      img: "/src/images/de_sec5_con05.webp",
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
            <span className="text-2xl">앞서가는 프론트엔드 개발자를 위한 커리큘럼!</span><br/>
            <b className="mt-4 text-2xl">Next.js를 활용한 서비스 구축부터 서버리스 배포까지</b>
          </h4>
        </div>

        <div className="relative mt-10 detail-slide1">
          <Swiper
            slidesPerView={1}
            navigation={{ prevEl:".detail-slide1 .slide_prev", nextEl:".detail-slide1 .slide_next" }} 
            modules={[Navigation]}
            className="mySwiper"
            breakpoints= {{
              640: {
                slidesPerView: 2
              },
              960: {
                slidesPerView: 3
              }
            }}
          >
            {list.map((item, index) => (
               <SwiperSlide key={index}>
                <div className="px-5">
                  <p>
                    <img alt={item.title} src={item.img} />
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button className="absolute left-[-2rem] top-[50%] mt-[-1.5rem] p-1 text-5xl text-black slide_prev"><i className="xi-angle-left-min" /></button>
          <button className="absolute right-[-2rem] top-[50%] mt-[-1.5rem] p-1 text-5xl text-black slide_next"><i className="xi-angle-right-min" /></button>
        </div>
        <p className="mt-5 text-lg text-center text-black">
            30가지 이상의 기본&심화 기능 학습과 구현 실습을 동시에!<br/>
            약 15시간 분량의 집중 공략 강의로, Next.js를 마스터 해보세요.
          </p>
      </div>
    </>
  );
}