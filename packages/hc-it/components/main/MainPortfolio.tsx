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
import MainTitle from '@/components/MainTitle'

export default function MainPortfolio() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedImage, setSelectedImage] = useState(null)
  const list = [
    {
      title: '포트폴리오1',
      thumb: '/src/images/t_pt01.webp',
      img: '/src/images/po01.webp',
    },
    {
      title: '포트폴리오1',
      thumb: '/src/images/t_pt02.webp',
      img: '/src/images/po02.webp',
    },
    {
      title: '포트폴리오1',
      thumb: '/src/images/t_pt03.webp',
      img: '/src/images/po03.webp',
    },
    {
      title: '포트폴리오1',
      thumb: '/src/images/t_pt04.webp',
      img: '/src/images/po04.webp',
    },
    {
      title: '포트폴리오1',
      thumb: '/src/images/t_pt05.webp',
      img: '/src/images/po05.webp',
    },
    {
      title: '포트폴리오1',
      thumb: '/src/images/t_pt06.webp',
      img: '/src/images/po06.webp',
    },
    {
      title: '포트폴리오1',
      thumb: '/src/images/t_pt07.webp',
      img: '/src/images/po07.webp',
    },
    {
      title: '포트폴리오1',
      thumb: '/src/images/t_pt08.webp',
      img: '/src/images/po08.webp',
    },
    {
      title: '포트폴리오1',
      thumb: '/src/images/t_pt09.webp',
      img: '/src/images/po09.webp',
    },
    {
      title: '포트폴리오1',
      thumb: '/src/images/t_pt10.webp',
      img: '/src/images/po10.webp',
    },
    {
      title: '포트폴리오1',
      thumb: '/src/images/t_pt11.webp',
      img: '/src/images/po11.webp',
    },
    {
      title: '포트폴리오1',
      thumb: '/src/images/t_pt12.webp',
      img: '/src/images/po12.webp',
    },
    {
      title: '포트폴리오1',
      thumb: '/src/images/t_pt13.webp',
      img: '/src/images/po13.webp',
    },
    {
      title: '포트폴리오1',
      thumb: '/src/images/t_pt14.webp',
      img: '/src/images/po14.webp',
    },
  ]

  const handleSlideClick = item => {
    setSelectedImage(item)
    onOpen()
  }
  return (
    <>
      <div className="wrap">
        <MainTitle title={'PORTFOLIO ⭐️'} />
      </div>
      <div className={`relative mt-5 max-w-[1440px] mx-auto main-portfolio`}>
        <Swiper
          slidesPerView={1.3}
          spaceBetween={20}
          navigation={{
            prevEl: '.main-portfolio .slide_prev',
            nextEl: '.main-portfolio .slide_next',
          }}
          modules={[Navigation]}
          className="!px-5 xl:!px-0"
          breakpoints={{
            640: {
              slidesPerView: 2.3,
            },
            960: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {list.map((item, index) => (
            <SwiperSlide key={index}>
              <p
                onClick={() => handleSlideClick(item)}
                className="overflow-hidden rounded-t-lg rounded-br-lg cursor-pointer"
              >
                <img alt={item.title} src={item.thumb} />
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="hidden absolute top-[-3rem] right-0 lg:flex">
          <button className="p-1 text-2xl text-black slide_prev">
            <i className="xi-angle-left-min" />
          </button>
          <button className="p-1 text-2xl text-black slide_next">
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
