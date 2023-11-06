import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/swiper-bundle.css'
import { useState } from 'react'

export default function Portfolio() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedImage, setSelectedImage] = useState(null)
  const list = [
    {
      title: '포트폴리오1',
      thumb: '/src/images/t_pt01.jpg',
      img: '/src/images/po01.jpeg',
    },
    {
      title: '포트폴리오1',
      thumb: '/src/images/t_pt02.jpg',
      img: '/src/images/po02.jpeg',
    },
    {
      title: '포트폴리오1',
      thumb: '/src/images/t_pt03.jpg',
      img: '/src/images/po03.jpeg',
    },
    {
      title: '포트폴리오1',
      thumb: '/src/images/t_pt04.jpg',
      img: '/src/images/po04.jpeg',
    },
    {
      title: '포트폴리오1',
      thumb: '/src/images/t_pt05.jpg',
      img: '/src/images/po05.jpeg',
    },
    {
      title: '포트폴리오1',
      thumb: '/src/images/t_pt06.jpg',
      img: '/src/images/po06.jpeg',
    },
    {
      title: '포트폴리오1',
      thumb: '/src/images/t_pt07.jpg',
      img: '/src/images/po07.jpeg',
    },
    {
      title: '포트폴리오1',
      thumb: '/src/images/t_pt08.jpg',
      img: '/src/images/po08.jpeg',
    },
    {
      title: '포트폴리오1',
      thumb: '/src/images/t_pt09.jpg',
      img: '/src/images/po09.jpeg',
    },
    {
      title: '포트폴리오1',
      thumb: '/src/images/t_pt10.jpg',
      img: '/src/images/po10.jpg',
    },
    {
      title: '포트폴리오1',
      thumb: '/src/images/t_pt11.jpg',
      img: '/src/images/po11.jpeg',
    },
    {
      title: '포트폴리오1',
      thumb: '/src/images/t_pt12.jpg',
      img: '/src/images/po12.jpeg',
    },
    {
      title: '포트폴리오1',
      thumb: '/src/images/t_pt13.jpg',
      img: '/src/images/po13.jpeg',
    },
    {
      title: '포트폴리오1',
      thumb: '/src/images/t_pt14.jpg',
      img: '/src/images/po14.jpeg',
    },
  ]

  const handleSlideClick = item => {
    setSelectedImage(item)
    onOpen()
  }
  return (
    <>
      <div className="overflow-hidden xl:overflow-visible wrap">
        <h4 className="text-center text-white">
          <span className="text-2xl">강의를 잘 따라가면 만나볼 수 있어요.</span>
          <br />
          <b className="mt-4 text-3xl">PORTFOLIO</b>
        </h4>

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
                  <p
                    onClick={() => handleSlideClick(item)}
                    className="cursor-pointer"
                  >
                    <img alt={item.title} src={item.thumb} />
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button className="absolute left-[-2rem] top-[50%] mt-[-1.5rem] p-1 text-5xl text-white slide_prev">
            <i className="xi-angle-left-min" />
          </button>
          <button className="absolute right-[-2rem] top-[50%] mt-[-1.5rem] p-1 text-5xl text-white slide_next">
            <i className="xi-angle-right-min" />
          </button>
        </div>
      </div>
      <Modal
        size={'4xl'}
        backdrop={'opaque'}
        placement={'center'}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {selectedImage.title}
              </ModalHeader>
              <ModalBody className="max-h-[70vh] overflow-y-auto">
                <img src={selectedImage.img} alt={selectedImage.title} />
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
  )
}
