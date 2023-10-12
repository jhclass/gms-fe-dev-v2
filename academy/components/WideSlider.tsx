import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Header() {
    return (
      <>
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="mySwiper1"
          >
            <SwiperSlide style={{background:'tomato'}}>
              <div className="wrap">
                <img
                  src="https://placehold.it/1440x600"
                  style={{ overflow: "hidden" }}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide style={{background:'red'}}>
              <div className="wrap">
                <img
                  src="https://placehold.it/1440x600"
                  style={{ overflow: "hidden" }}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide style={{background:'blue'}}>
              <div className="wrap">
                <img
                  src="https://placehold.it/1440x600"
                  style={{ overflow: "hidden" }}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide style={{background:'yellow'}}>
              <div className="wrap">
                <img
                  src="https://placehold.it/1440x600"
                  style={{ overflow: "hidden" }}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide style={{background:'pink'}}>
              <div className="wrap">
                <img
                  src="https://placehold.it/1440x600"
                  style={{ overflow: "hidden" }}
                />
              </div>
            </SwiperSlide>
          </Swiper>
      </>
    );
  }