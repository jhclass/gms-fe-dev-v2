import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function MainSilder() {
    return (
      <>
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="mySwiper1"
          >
            <SwiperSlide style={{background:'#b1dcff'}}>
              <div className="flex justify-end wrap">
                <img
                  src="/src/images/mainBnr01.jpg"
                  style={{ overflow: "hidden" }}
                  className=""
                />
                <div className="absolute top-[48%] left-0 translate-y-[-50%]">
                  <p className="inline px-3 py-2 text-lg text-center text-white rounded-r-lg rounded-tl-lg bg-primary">신규모집</p>
                  <h2 className="mt-4 font-bold text-black text-5xl/tight">코딩이 이렇게 쉬워?<br/>코딩 스텝원</h2>
                  <p className="mt-4 text-black text-2xl/tight">국비 지원으로 듣는 0원 코딩 강의<br/>11월 7일까지 모집!</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide style={{background:'#0c0818'}}>
              <div className="flex justify-end wrap">
                <img
                  src="/src/images/mainBnr02.jpg"
                  style={{ overflow: "hidden" }}
                  className=""
                />
                <div className="absolute top-[48%] left-0 translate-y-[-50%]">
                  <p className="inline px-3 py-2 text-lg text-center text-white rounded-r-lg rounded-tl-lg bg-primary">얼리버드 30%</p>
                  <h2 className="mt-4 font-bold text-white text-5xl/tight">프론트엔드 개발자를 위한<br/>고성능 대규모 프로젝트</h2>
                  <p className="mt-4 text-white text-2xl/tight">고퀄리티 10개 프로젝트로 최저고하부터 유지보수까지</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide style={{background:'#000'}}>
              <div className="flex justify-end wrap">
                <img
                  src="/src/images/mainBnr03.jpg"
                  style={{ overflow: "hidden" }}
                  className=""
                />
                <div className="absolute top-[48%] left-0 translate-y-[-50%]">
                  <p className="inline px-3 py-2 text-lg text-center text-white rounded-r-lg rounded-tl-lg bg-primary">핵심만 콕콕</p>
                  <h2 className="mt-4 font-bold text-white text-5xl/tight">백엔드 개발자 7명이 알려주는<br/>7개의 실전 인사이트</h2>
                  <p className="mt-4 text-white text-2xl/tight">지금 수업 영상 30+편 무료 공개 중!</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide style={{background:'#000'}}>
              <div className="flex justify-end wrap">
                <img
                  src="/src/images/mainBnr04.jpg"
                  style={{ overflow: "hidden" }}
                  className=""
                />
                <div className="absolute top-[48%] left-0 translate-y-[-50%]">
                  <p className="inline px-3 py-2 text-lg text-center text-white rounded-r-lg rounded-tl-lg bg-primary">매월 업데이트</p>
                  <h2 className="mt-4 font-bold text-white text-5xl/tight">무슨 강의 들을지 고민이라면?<br/>인기 TOP10 강의 보기</h2>
                  <p className="mt-4 text-white text-2xl/tight">입문부터 실전까지 믿고 보는 Pick!</p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
      </>
    );
  }