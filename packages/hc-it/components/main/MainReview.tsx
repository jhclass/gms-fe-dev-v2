import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { Grid, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import MainTitle from "@/components/MainTitle";
import "swiper/css";
import "swiper/css/grid";

export default function Portfolio() {
  const list = [
    {
      name: "김○○",
      img: "/src/images/user01.png",
      content: "비전공자라서 개념 학습 및 정리만 해도 많은 시간이 소요되는 분 평생 소장 가능한 도식화된 강사님의 특별 강의 자료로 개념 정리 및 복습이 용이합니다.",
      class:"프론트엔드",
      rating:3.7,
    },
    {
      name: "이○○",
      img: "/src/images/user01.png",
      content: "비전공자라서 개념 학습 및 정리만 해도 많은 시간이 소요되는 분 평생 소장 가능한 도식화된 강사님의 특별 강의 자료로 개념 정리 및 복습이 용이합니다.",
      class:"프론트엔드",
      rating:5,
    },
    {
      name: "박○○",
      img: "/src/images/user01.png",
      content: "비전공자라서 개념 학습 및 정리만 해도 많은 시간이 소요되는 분 평생 소장 가능한 도식화된 강사님의 특별 강의 자료로 개념 정리 및 복습이 용이합니다.",
      class:"프론트엔드",
      rating:4.5,
    },
    {
      name: "정○○",
      img: "/src/images/user01.png",
      content: "비전공자라서 개념 학습 및 정리만 해도 많은 시간이 소요되는 분 평생 소장 가능한 도식화된 강사님의 특별 강의 자료로 개념 정리 및 복습이 용이합니다.",
      class:"프론트엔드",
      rating:4.5,
    },
    {
      name: "홍○○",
      img: "/src/images/user01.png",
      content: "비전공자라서 개념 학습 및 정리만 해도 많은 시간이 소요되는 분 평생 소장 가능한 도식화된 강사님의 특별 강의 자료로 개념 정리 및 복습이 용이합니다.",
      class:"프론트엔드",
      rating:5,
    },
    {
      name: "윤○○",
      img: "/src/images/user01.png",
      content: "비전공자라서 개념 학습 및 정리만 해도 많은 시간이 소요되는 분 평생 소장 가능한 도식화된 강사님의 특별 강의 자료로 개념 정리 및 복습이 용이합니다.",
      class:"프론트엔드",
      rating:4.7,
    },
    {
      name: "최○○",
      img: "/src/images/user01.png",
      content: "비전공자라서 개념 학습 및 정리만 해도 많은 시간이 소요되는 분 평생 소장 가능한 도식화된 강사님의 특별 강의 자료로 개념 정리 및 복습이 용이합니다.",
      class:"프론트엔드",
      rating:3.9,
    },
    {
      name: "류○○",
      img: "/src/images/user01.png",
      content: "비전공자라서 개념 학습 및 정리만 해도 많은 시간이 소요되는 분 평생 소장 가능한 도식화된 강사님의 특별 강의 자료로 개념 정리 및 복습이 용이합니다.",
      class:"프론트엔드",
      rating:3.0,
    },
  ]

  return (
    <>
      <div className="wrap">
        <MainTitle title={'REVIEW ✌️'} colorWhite={true} />
      </div>
      <div className={`relative mt-5 max-w-[1440px] mx-auto main-review`}>
        <Swiper
          slidesPerView={1.1}
          grid={{
            rows: 2,
            fill: 'row',
          }}
          spaceBetween={20}
          navigation={{ prevEl:".main-review .slide_prev", nextEl:".main-review .slide_next" }} 
          modules={[Grid, Navigation]}
          className="!px-5 xl:!px-0"
          breakpoints= {{
            960: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
          }}
        >
          {list.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-row items-center px-4 py-5 overflow-hidden rounded-t-lg rounded-br-lg bg-zinc-500 rounded-e-lg">
                <div className="w-2/7 mr-7">
                  <img src={item.img} alt={item.name} />
                  <div className="flex flex-col items-center mt-2 text-xl font-bold text-zinc-300">
                    <p><span className="text-white">{item.rating.toFixed(1).toString()}</span> / 5</p>
                    <span 
                    style={{ width: `${1.2 * item.rating}rem` }}
                    className="h-[1rem] display star_bg_w">
                    </span>
                  </div>
                </div>
                <div className="w-5/7">
                  <h5 className="text-sm font-bold text-zinc-300">[{item.class}] {item.name}</h5>
                  <p className="mt-1 text-base text-white">{item.content}</p>
                </div>
             </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="hidden absolute top-[-3rem] right-0 lg:flex">
          <button className="p-1 text-2xl text-white slide_prev"><i className="xi-angle-left-min" /></button>
          <button className="p-1 text-2xl text-white slide_next"><i className="xi-angle-right-min" /></button>
        </div>
      </div>
    </>
  );
}