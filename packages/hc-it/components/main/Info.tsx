import { Link } from "@nextui-org/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

export default function Info() {
  const list = [
    {
      title: "타이틀111 타이틀111 타이틀111",
      img: "https://placehold.it/720x200",
    },
    {
      title: "타이틀111 타이틀111 타이틀111",
      img: "https://placehold.it/720x200",
    },
  ];
    return (
      <>
        <div className="flex flex-col wrap lg:flex-row">
            <div className="w-full lg:w-2/5 lg:mr-10">
                <h4 className="relative pb-3 text-xl font-bold border-b-2 border-zinc-600">
                    공지사항
                    <Link href="" className="absolute right-0 text-xs font-semibold bottom-3 text-primary">MORE<i className="xi-angle-right-min" /></Link>
                </h4>
                <ul>
                    <li className="border-b border-zinc-200">
                        <Link href={""} className="flex justify-between py-2 hover:text-primary text-zinc-800">
                            <p className="relative pl-5 text-sm after:w-0.5 after:h-0.5 after:absolute after:left-2 after:top-[50%] after:-mt-0.25 after:bg-zinc-800 after:rounded-full">공지사항입니다.</p>
                            <p className="text-xs text-zinc-500">2023.10.13</p>
                        </Link>
                    </li>
                    <li className="border-b border-zinc-200">
                        <Link href={""} className="flex justify-between py-2 hover:text-primary text-zinc-800">
                            <p className="relative pl-5 text-sm after:w-0.5 after:h-0.5 after:absolute after:left-2 after:top-[50%] after:-mt-0.25 after:bg-zinc-800 after:rounded-full">공지사항입니다.</p>
                            <p className="text-xs text-zinc-500">2023.10.13</p>
                        </Link>
                    </li>
                    <li className="border-b border-zinc-200">
                        <Link href={""} className="flex justify-between py-2 hover:text-primary text-zinc-800">
                            <p className="relative pl-5 text-sm after:w-0.5 after:h-0.5 after:absolute after:left-2 after:top-[50%] after:-mt-0.25 after:bg-zinc-800 after:rounded-full">공지사항입니다.</p>
                            <p className="text-xs text-zinc-500">2023.10.13</p>
                        </Link>
                    </li>
                    <li className="border-b border-zinc-200">
                        <Link href={""} className="flex justify-between py-2 hover:text-primary text-zinc-800">
                            <p className="relative pl-5 text-sm after:w-0.5 after:h-0.5 after:absolute after:left-2 after:top-[50%] after:-mt-0.25 after:bg-zinc-800 after:rounded-full">공지사항입니다.</p>
                            <p className="text-xs text-zinc-500">2023.10.13</p>
                        </Link>
                    </li>
                    <li className="border-b border-zinc-200">
                        <Link href={""} className="flex justify-between py-2 hover:text-primary text-zinc-800">
                            <p className="relative pl-5 text-sm after:w-0.5 after:h-0.5 after:absolute after:left-2 after:top-[50%] after:-mt-0.25 after:bg-zinc-800 after:rounded-full">공지사항입니다.</p>
                            <p className="text-xs text-zinc-500">2023.10.13</p>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="relative w-full mt-20 lg:w-2/5 lg:mr-10 lg:mt-0">
                <h4 className="relative pb-3 text-xl font-bold">
                    SNS 이벤트
                </h4>
                <Swiper
                    autoplay={{
                        delay: 5000,
                      }}
                    slidesPerView={2}
                    slidesPerGroup={2}
                    pagination={{ clickable: true, el: '.info_pager' }} 
                    modules={[Autoplay, Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <div className="px-2">
                            <Link href="" className="block w-full h-full">
                                <img alt="instagram 이벤트" src="/src/images/b01.jpg" width="100%" />
                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="px-2">
                            <Link href="" className="block w-full h-full">
                                <img alt="instagram 이벤트" src="/src/images/b02.jpg" width="100%" />
                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="px-2">
                            <Link href="" className="block w-full h-full">
                                <img alt="instagram 이벤트" src="/src/images/b03.jpg" width="100%" />
                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="px-2">
                            <Link href="" className="block w-full h-full">
                                <img alt="instagram 이벤트" src="/src/images/b04.jpg" width="100%" />
                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="px-2">
                            <Link href="" className="block w-full h-full">
                                <img alt="instagram 이벤트" src="/src/images/b05.jpg" width="100%" />
                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="px-2">
                            <Link href="" className="block w-full h-full">
                                <img alt="instagram 이벤트" src="/src/images/b06.jpg" width="100%" />
                            </Link>
                        </div>
                    </SwiperSlide>
                </Swiper>
                <div className="absolute right-0 top-2">
                    <div className="info_pager"></div>
                </div>
            </div>
            <div className="w-full mt-20 lg:w-1/5 lg:mt-0">
                <h4 className="relative pb-3 text-xl font-bold border-b-2 border-zinc-600">
                    고객센터
                    <Link href="" className="absolute right-0 text-xs font-semibold bottom-3 text-primary">MORE<i className="xi-angle-right-min" /></Link>
                </h4>
                <ul className="flex flex-col items-center">
                    <li className="flex items-center mt-6 rounded-lg">
                        <Link href="tel:02-393-4321" className="px-3 py-2 mr-4 text-sm rounded-lg text-primary border-1 border-primary">
                            전화 상담
                        </Link>
                        <Link href="/consult" className="px-3 py-2 text-sm rounded-lg text-primary border-1 border-primary">
                            방문 상담
                        </Link>
                    </li>
                    <li className="flex flex-col items-center w-full pt-5 mt-6 text-sm font-normal text-center text-zinc-500 border-t-1">
                        오전 9:00 - 오후 18:00<br/>
                        (점심: 12:30 ~ 13:30)<br/>
                        주말 및 공휴일은 휴무입니다.
                    </li>
                </ul>
            </div>
        </div>
      </>
    );
  }