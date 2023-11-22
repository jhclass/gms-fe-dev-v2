import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

export default function ReviewSlide(props) {
  const ListItem = props.reviewList
  return (
    <>
      <div className="relative mt-5 max-w-[1440px] mx-auto main-review px-12">
        <Swiper
          slidesPerView={1.1}
          spaceBetween={20}
          navigation={{
            prevEl: '.main-review .slide_prev',
            nextEl: '.main-review .slide_next',
          }}
          modules={[Navigation]}
          className="!px-5 xl:!px-0"
          breakpoints={{
            960: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
          }}
        >
          {ListItem.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-row items-center px-4 py-5 overflow-hidden rounded-t-lg rounded-br-lg bg-zinc-600 rounded-e-lg">
                <div className="w-1/5 min-w-[6rem] mr-7">
                  <figure
                    className="w-full h-full p-2 overflow-hidden rounded-full"
                    style={{ backgroundColor: item.backgroundColor }}
                  >
                    <img src={item.img} alt={item.name} />
                  </figure>
                  <div className="flex flex-col items-center mt-2 text-xl font-bold text-zinc-300">
                    <p>
                      <span className="text-white">
                        {item.rating.toFixed(1).toString()}
                      </span>{' '}
                      / 5
                    </p>
                    <span
                      style={{ width: `${1.2 * item.rating}rem` }}
                      className="h-[1rem] display star_bg_w"
                    ></span>
                  </div>
                </div>
                <div className="w-4/5 h-auto">
                  <h5 className="text-sm font-bold text-zinc-300">
                    [{item.class}] {item.name}
                  </h5>
                  <p className="mt-1 text-base text-white line-clamp-3">
                    {item.content}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="absolute left-[-1rem] top-[50%] mt-[-1.5rem] p-1 text-5xl text-black slide_prev">
          <i className="xi-angle-left-min" />
        </button>
        <button className="absolute right-[-1rem] top-[50%] mt-[-1.5rem] p-1 text-5xl text-black slide_next">
          <i className="xi-angle-right-min" />
        </button>
      </div>
    </>
  )
}
