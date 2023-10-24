import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Portfolio() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <>
      <div className="wrap">
        <h4 className="text-center text-white">
          <span className="text-xl">강의를 잘 따라가면 만나볼 수 있어요.</span><br/>
          <b className="mt-4 text-3xl">PORTFOLIO</b>
        </h4>

        <div className="relative mt-10 detail-slide1">
          <Swiper
            slidesPerView={3}
            navigation={{ prevEl:".detail-slide1 .slide_prev", nextEl:".detail-slide1 .slide_next" }} 
            modules={[Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="px-5">
                <figure onClick={onOpen} className="cursor-pointer">
                  <img src="http://via.placeholder.com/1280x720" />
                </figure>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="px-5">
                <figure onClick={onOpen} className="cursor-pointer">
                  <img src="http://via.placeholder.com/1280x720" />
                </figure>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="px-5">
                <figure onClick={onOpen} className="cursor-pointer">
                  <img src="http://via.placeholder.com/1280x720" />
                </figure>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="px-5">
                <figure onClick={onOpen} className="cursor-pointer">
                  <img src="http://via.placeholder.com/1280x720" />
                </figure>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="px-5">
                <figure onClick={onOpen} className="cursor-pointer">
                  <img src="http://via.placeholder.com/1280x720" />
                </figure>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="px-5">
                <figure onClick={onOpen} className="cursor-pointer">
                  <img src="http://via.placeholder.com/1280x720" />
                </figure>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="px-5">
                <figure onClick={onOpen} className="cursor-pointer">
                  <img src="http://via.placeholder.com/1280x720" />
                </figure>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="px-5">
                <figure onClick={onOpen} className="cursor-pointer">
                  <img src="http://via.placeholder.com/1280x720" />
                </figure>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="px-5">
                <figure onClick={onOpen} className="cursor-pointer">
                  <img src="http://via.placeholder.com/1280x720" />
                </figure>
              </div>
            </SwiperSlide>
          </Swiper>
          <button className="absolute left-[-3rem] top-[50%] mt-[-1.5rem] p-1 text-5xl text-white slide_prev"><i className="xi-angle-left-min" /></button>
          <button className="absolute right-[-3rem] top-[50%] mt-[-1.5rem] p-1 text-5xl text-white slide_next"><i className="xi-angle-right-min" /></button>
        </div>
      </div>
      <Modal backdrop={'opaque'} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">포트폴리오</ModalHeader>
              <ModalBody>
                <img src="http://via.placeholder.com/1280x720" />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}