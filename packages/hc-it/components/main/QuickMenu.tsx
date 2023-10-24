import Link from "next/link";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function QuickMenu() {
  return (
    <>
      <div className="flex flex-wrap items-center py-5 wrap">
        <div className="relative lg:w-full lg:flex-1 xl:w-3/6 xl:mr-10">
          <ul className="flex justify-between">
            <li>
              <Link href="/consult" className="flex flex-col items-center p-3 text-white border-2 rounded-lg bg-primary border-primary">
                <span className="text-3xl/none"><i className="xi-emoticon-smiley-o" /></span>
                <span className="mt-1">온라인상담</span>
              </Link>
            </li>
            <li>
              <Link href="/consult" className="flex flex-col items-center p-3 border-2 rounded-lg border-primary text-primary">
                <span className="text-3xl/none"><i className="xi-emoticon-smiley-o" /></span>
                <span className="mt-1">국비혜택조회</span>
              </Link>
            </li>
            <li className="border-b border-zinc-200">
              <Link href="/consult" className="flex flex-col items-center p-3 border-2 rounded-lg border-primary text-primary">
                <span className="text-3xl/none"><i className="xi-emoticon-smiley-o" /></span>
                <span className="mt-1">수강료조회</span>
              </Link>
            </li>
            <li className="border-b border-zinc-200">
              <Link href="/consult" className="flex flex-col items-center p-3 border-2 rounded-lg border-primary text-primary">
                <span className="text-3xl/none"><i className="xi-emoticon-smiley-o" /></span>
                <span className="mt-1">개강일조회</span>
              </Link>
            </li>
            <li className="border-b border-zinc-200">
              <Link href="/consult" className="flex flex-col items-center p-3 border-2 rounded-lg border-primary text-primary">
                <span className="text-3xl/none"><i className="xi-emoticon-smiley-o" /></span>
                <span className="mt-1">개강일조회</span>
              </Link>
            </li>
            <li className="border-b border-zinc-200">
              <Link href="/consult" className="flex flex-col items-center p-3 border-2 rounded-lg border-primary text-primary">
                <span className="text-3xl/none"><i className="xi-emoticon-smiley-o" /></span>
                <span className="mt-1">개강일조회</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex lg:w-2/3 lg:flex-1 xl:w-2/6 xl:mr-10" >
          <h4 className="w-1/5 pr-3 text-xl font-bold text-primary">
            NOTICE
          </h4>
          <Swiper
            direction={'vertical'}
            autoplay={{
                delay: 1000,
              }}
            slidesPerView={1}
            loop={true}
            modules={[Autoplay]}
            className="w-4/5 h-6"
          >
            <SwiperSlide>
              <Link href={""} className="text-zinc-800">
                <p className="relative text-sm/sm line-clamp-1">
                  공지사항 공지사항 공지사항 공지사항 공지사항 입니다.1
                </p>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link href={""} className="text-zinc-800">
                <p className="relative text-sm/sm line-clamp-1">
                  공지사항 공지사항 공지사항 공지사항 공지사항 입니다.2
                </p>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link href={""} className="text-zinc-800">
                <p className="relative text-sm/sm line-clamp-1">
                  공지사항 공지사항 공지사항 공지사항 공지사항 입니다.3
                </p>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link href={""} className="text-zinc-800">
                <p className="relative text-sm/sm line-clamp-1">
                  공지사항 공지사항 공지사항 공지사항 공지사항 입니다.4
                </p>
              </Link>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="lg:hidden xl:w-1/6">
          <p>상담전화</p>
          <h4 className="text-3xl font-bold">
            02)393-4321
          </h4>
        </div>
      </div>
    </>
  );
};