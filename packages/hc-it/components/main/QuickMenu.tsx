import Link from "next/link";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function QuickMenu() {
  const handleTest = (e) => {
    e.preventDefault();
    alert(`준비중입니다. 😊`);
  };
  return (
    <>
      <div className="flex flex-wrap items-center justify-between py-5 wrap">
        <div className="relative w-4/6 xl:w-3/6">
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
        <div className="flex w-2/6 px-5 lg:flex-col xl:flex-row">
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
            className="w-full h-6 xl:w-4/5 lg:mx-0"
          >
            <SwiperSlide>
              <Link href="#" onClick={handleTest} className="text-zinc-800">
                <p className="relative text-sm/sm line-clamp-1">
                  공지사항 공지사항 공지사항 공지사항 공지사항 입니다.1
                </p>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link href="#" onClick={handleTest}  className="text-zinc-800">
                <p className="relative text-sm/sm line-clamp-1">
                  공지사항 공지사항 공지사항 공지사항 공지사항 입니다.2
                </p>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link href="#" onClick={handleTest}  className="text-zinc-800">
                <p className="relative text-sm/sm line-clamp-1">
                  공지사항 공지사항 공지사항 공지사항 공지사항 입니다.3
                </p>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link href="#" onClick={handleTest}  className="text-zinc-800">
                <p className="relative text-sm/sm line-clamp-1">
                  공지사항 공지사항 공지사항 공지사항 공지사항 입니다.4
                </p>
              </Link>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="hidden xl:block">
          <p>상담전화</p>
          <h4 className="text-3xl font-bold">
            <Link href="tel:02-393-4321" className="text-black">
             02)393-4321
            </Link>
          </h4>
        </div>
      </div>
    </>
  );
};