import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ListSlider({slideNo}) {
  const list = [
    {
      title: "타이틀111 타이틀111",
      img: "https://placehold.it/500x300",
      subs: "내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용.",
    },
    {
      title: "타이틀111 타이틀111",
      img: "https://placehold.it/500x300",
      subs: "내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용.",
    },
    {
      title: "타이틀111 타이틀111",
      img: "https://placehold.it/500x300",
      subs: "내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용.",
    },
    {
      title: "타이틀111 타이틀111",
      img: "https://placehold.it/500x300",
      subs: "내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용.",
    },
    {
      title: "타이틀111 타이틀111",
      img: "https://placehold.it/500x300",
      subs: "내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용.",
    },
    {
      title: "타이틀111 타이틀111",
      img: "https://placehold.it/500x300",
      subs: "내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용.",
    },
    {
      title: "타이틀111 타이틀111",
      img: "https://placehold.it/500x300",
      subs: "내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용.",
    },
    {
      title: "타이틀111 타이틀111",
      img: "https://placehold.it/500x300",
      subs: "내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용.",
    },
    {
      title: "타이틀111 타이틀111",
      img: "https://placehold.it/500x300",
      subs: "내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용.",
    },
    {
      title: "타이틀111 타이틀111",
      img: "https://placehold.it/500x300",
      subs: "내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용.",
    },
  ]
    return (
      <>
      <div className={`relative list_slider_${slideNo}`}>
          <Swiper
             slidesPerView={5}
             spaceBetween={30}
             navigation={{ prevEl:`.list_slider_${slideNo} .slide_prev`, nextEl:`.list_slider_${slideNo} .slide_next` }} 
             modules={[Navigation]}
             className="mySwiper"
          >
            {list.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="relative overflow-hidden rounded-r-xl rounded-tl-xl">
                    <img alt={item.title} src={item.img} />
                  </div>
                  <dl className="w-full h-full py-3">
                    <dd className="text-2xl">
                    {item.title}
                    </dd>
                    <dd className="mt-4 text-base">
                      {item.subs}
                    </dd>
                  </dl>
                </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute top-[-3rem] right-0 flex">
            <button className="p-1 text-2xl text-primary slide_prev"><i className="xi-angle-left-min" /></button>
            <button className="p-1 text-2xl text-primary slide_next"><i className="xi-angle-right-min" /></button>
          </div>
        </div>
      </>
    );
  }