import { Accordion, AccordionItem, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import Countdown from "@/components/Countdown";
import Form from "@/components/Form";

export default function Detail() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const scrollToConsult = () => {
    const consultSection = document.getElementById('consult');
    if (consultSection) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.clientHeight : 0;
      const consultSectionTop = consultSection.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: consultSectionTop - headerHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <section className="bg-black">
        <div className="text-center wrap">
          <p className="pt-20 text-center text-white">
            <span className="inline-block text-black border-2 border-[#61DAFB] bg-[#61DAFB] rounded-lg text-center text-xl font-bold px-2 py-1 mb-2">
              프로젝트로 배우는
            </span>
            <br/>
            <b className="inline-block mt-5 text-5xl/[4rem]"> 
              Next.js 완전 정복<br/>
              확장성 높은 커머스 서비스 구축하기
            </b>
          </p>
          <figure className="w-4/5 mx-auto mt-10">
            <img src="/src/images/detail1.webp" />
          </figure>
        </div>
      </section>
      <section className="py-10 bg-[#222222]">
        <div className="wrap">
          <div className="grid grid-cols-3 gap-8">
            <div className="py-10 bg-black rounded-lg">
              <p className="mx-auto my-0 text-lg text-center">
                <span className="text-black border-2 border-[#61DAFB] font-bold bg-[#61DAFB] rounded-lg px-2 py-1 mb-2">
                  01 Next.js로 할 수 있는 모든 것
                </span>
              </p>
              <p className="mt-5 text-center text-white">
                  Next.js의 기본/심화 기능을 익히고 <br/>
                  완성도 높은 프로젝트를 구축부터 배포까지!
              </p>
            </div>
            <div className="py-10 bg-black rounded-lg">
              <p className="mx-auto my-0 text-lg text-center">
                <span className="text-black border-2 border-[#61DAFB] font-bold bg-[#61DAFB] rounded-lg px-2 py-1 mb-2">
                  01 Next.js로 할 수 있는 모든 것
                </span>
              </p>
              <p className="mt-5 text-center text-white">
                  Next.js의 기본/심화 기능을 익히고 <br/>
                  완성도 높은 프로젝트를 구축부터 배포까지!
              </p>
            </div>
            <div className="py-10 bg-black rounded-lg">
              <p className="mx-auto my-0 text-lg text-center">
                <span className="text-black border-2 border-[#61DAFB] font-bold bg-[#61DAFB] rounded-lg px-2 py-1 mb-2">
                  01 Next.js로 할 수 있는 모든 것
                </span>
              </p>
              <p className="mt-5 text-center text-white">
                  Next.js의 기본/심화 기능을 익히고 <br/>
                  완성도 높은 프로젝트를 구축부터 배포까지!
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-black">
        <div className="wrap">
          <Link href={""}>
            <img src="" />
          </Link>
        </div>
      </section>
      <section className="pt-20 bg-black">
        <div className="wrap">
          <h4 className="text-center text-white">
            <span className="text-2xl">현재 토스증권 프론트엔드 챕터 리드로 재직 중인</span><br/>
            <b className="mt-5 text-4xl">최지민 강사님을 만나보세요.</b>
          </h4>
          <div className="flex justify-center mt-10">
            <div className="relative w-full pb-[56.25%]">
              <iframe 
                className="absolute w-full h-full" 
                src="//www.youtube.com/embed/AwR-hYyUxd8?enablejsapi=1&amp;origin=https%3A%2F%2Ffastcampus.co.kr" 
                title="비전공자 출신 개발자도 걱정하지 않아도 되는 이유 | 토스증권 프론트엔드 챕터 리드 최지민">
              </iframe>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-black">
        <div className="wrap">
          <h4 className="text-center text-white">
            <span className="text-2xl">Next.js, 시작할지 말지 고민하셨다면?</span><br/>
            <b className="mt-4 text-4xl">지금 이 강의로 시작해야 하는 6가지 이유</b>
          </h4>
          <ul className="grid grid-cols-3 gap-8 mt-10">
            <li className="flex items-center px-5 py-10 bg-white rounded-lg">
              <p className="w-1/6 mr-3 text-7xl">1</p>
              <p className="w-5/6 text-sm text-zinc-600">
                <span className="text-xl font-bold text-black mb-7">서비스 구축부터 서버리스 배포까지</span><br/>
                <b>Next.js의 기본-심화 기능</b>으로<br/>
                서비스 구축&amp;배포하고 성능, 최적화, 트러블슈팅까지
              </p>
            </li>
            <li className="flex items-center px-5 py-10 bg-white rounded-lg">
              <p className="w-1/6 mr-3 text-7xl">2</p>
              <p className="w-5/6 text-sm text-zinc-600">
                <span className="text-xl font-bold text-black mb-7">서비스 구축부터 서버리스 배포까지</span><br/>
                <b>Next.js의 기본-심화 기능</b>으로<br/>
                서비스 구축&amp;배포하고 성능, 최적화, 트러블슈팅까지
              </p>
            </li>
            <li className="flex items-center px-5 py-10 bg-white rounded-lg">
            <p className="w-1/6 mr-3 text-7xl">3</p>
              <p className="w-5/6 text-sm text-zinc-600">
                <span className="text-xl font-bold text-black mb-7">서비스 구축부터 서버리스 배포까지</span><br/>
                <b>Next.js의 기본-심화 기능</b>으로<br/>
                서비스 구축&amp;배포하고 성능, 최적화, 트러블슈팅까지
              </p>
            </li>
            <li className="flex items-center px-5 py-10 bg-white rounded-lg">
              <p className="w-1/6 mr-3 text-7xl">4</p>
              <p className="w-5/6 text-sm text-zinc-600">
                <span className="text-xl font-bold text-black mb-7">서비스 구축부터 서버리스 배포까지</span><br/>
                <b>Next.js의 기본-심화 기능</b>으로<br/>
                서비스 구축&amp;배포하고 성능, 최적화, 트러블슈팅까지
              </p>
            </li>
            <li className="flex items-center px-5 py-10 bg-white rounded-lg">
              <p className="w-1/6 mr-3 text-7xl">5</p>
              <p className="w-5/6 text-sm text-zinc-600">
                <span className="text-xl font-bold text-black mb-7">서비스 구축부터 서버리스 배포까지</span><br/>
                <b>Next.js의 기본-심화 기능</b>으로<br/>
                서비스 구축&amp;배포하고 성능, 최적화, 트러블슈팅까지
              </p>
            </li>
            <li className="flex items-center px-5 py-10 bg-white rounded-lg">
            <p className="w-1/6 mr-3 text-7xl">6</p>
              <p className="w-5/6 text-sm text-zinc-600">
                <span className="text-xl font-bold text-black mb-7">서비스 구축부터 서버리스 배포까지</span><br/>
                <b>Next.js의 기본-심화 기능</b>으로<br/>
                서비스 구축&amp;배포하고 성능, 최적화, 트러블슈팅까지
              </p>
            </li>
          </ul>
          <p className="mt-10 text-xl text-center text-white">
            프론트엔드 실무를 200% 반영한 Next.js 프로젝트로<br/>
            네카라쿠배당토에서 모셔가는 개발자로 트렌디한 역량을 키워보세요!
          </p>
        </div>
      </section>
      <section className="py-20 bg-zinc-200">
        <div className="wrap">
          <ul className="grid grid-cols-2 gap-8">
            <li className="flex flex-col items-center px-10 py-8 bg-white rounded-lg">
              <img src="http://via.placeholder.com/69x69" />
              <p className="mt-5 font-bold font-lg">SSR/SSG을 활용한 SEO 최적화</p>
              <p className="mt-4 font-lg">
                Next.js는 SSR(Server Side Rendering)/SSG(Static Site Generation)를 기본으로 제공하기 때문에,<br/>
                SEO(Search Engine Optimization)에 대한 고민을 해결할 수 있습니다.
              </p>
            </li>
            <li className="flex flex-col items-center px-10 py-8 bg-white rounded-lg">
              <img src="http://via.placeholder.com/69x69" />
              <p className="mt-5 font-bold font-lg">SSR/SSG을 활용한 SEO 최적화</p>
              <p className="mt-4 font-lg">
                Next.js는 SSR(Server Side Rendering)/SSG(Static Site Generation)를 기본으로 제공하기 때문에,<br/>
                SEO(Search Engine Optimization)에 대한 고민을 해결할 수 있습니다.
              </p>
            </li>
            <li className="flex flex-col items-center px-10 py-8 bg-white rounded-lg">
              <img src="http://via.placeholder.com/69x69" />
              <p className="mt-5 font-bold font-lg">SSR/SSG을 활용한 SEO 최적화</p>
              <p className="mt-4 font-lg">
                Next.js는 SSR(Server Side Rendering)/SSG(Static Site Generation)를 기본으로 제공하기 때문에,<br/>
                SEO(Search Engine Optimization)에 대한 고민을 해결할 수 있습니다.
              </p>
            </li>
            <li className="flex flex-col items-center px-10 py-8 bg-white rounded-lg">
              <img src="http://via.placeholder.com/69x69" />
              <p className="mt-5 font-bold font-lg">SSR/SSG을 활용한 SEO 최적화</p>
              <p className="mt-4 font-lg">
                Next.js는 SSR(Server Side Rendering)/SSG(Static Site Generation)를 기본으로 제공하기 때문에,<br/>
                SEO(Search Engine Optimization)에 대한 고민을 해결할 수 있습니다.
              </p>
            </li>
          </ul>
        </div>
      </section>
      <section className="py-20 bg-black">
        <div className="wrap">
          <div className="text-center">
            <p className="inline-block px-4 py-2 mb-5 text-sm font-bold text-center text-black bg-white border-2 border-white rounded-lg">
              POINT 1
            </p>
            <h4 className="text-center text-white">
              <span className="text-2xl">앞서가는 프론트엔드 개발자를 위한 커리큘럼!</span><br/>
              <b className="mt-4 text-2xl">Next.js를 활용한 서비스 구축부터 서버리스 배포까지</b>
            </h4>
            <ul className="w-4/5 mx-auto mt-10">
              <li className="relative p-6 mb-20 text-left text-white border-2 border-white rounded-lg">
                <span className="absolute bottom-[-5rem] left-[50%] text-6xl ml-[-1.5rem]"><i className="xi-angle-down"/></span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">Step 01. Next.js 시작하기 [약 2시간]</h5>
                <ul className="mt-3">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">Next.js 프레임워크에 대해 이해하고, 학습 전 간단한 환경을 세팅해 봅니다.</li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">프레임워크 구조, Data Fetching(SSR/SSG/CSR/ISR), Layouts / Image, Routing, API Routes 등 Next.js의 기본 기능을 학습합니다.</li>
                </ul>
              </li>
              <li className="relative mb-20 p-6 text-left text-[#D6F9FF] border-2 border-[#D6F9FF] rounded-lg">
                <span className="absolute bottom-[-5rem] left-[50%] text-6xl ml-[-1.5rem]"><i className="xi-angle-down"/></span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 02. 실습 : 블로그 프로젝트 [약 2시간]
                </h5>
                <ul className="mt-3">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    예제를 통해 Next.js의 기본 기능을 복습한 후, 본격적으로 블로그 연습 프로젝트를 시작합니다.
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    커스터마이징을 통해 나만의 블로그를 더욱 깊이 있게 구성하고, vercel로 배포합니다.
                  </li>
                </ul>
              </li>
              <li className="relative mb-20 p-6 text-left text-[#88EDFF] border-2 border-[#88EDFF] rounded-lg">
                <span className="absolute bottom-[-5rem] left-[50%] text-6xl ml-[-1.5rem]"><i className="xi-angle-down"/></span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 03. Next.js 심화 완성 [약 4시간]
                </h5>
                <ul className="mt-3">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    Next.js의 확장성을 향상하기 위해 SWC, Static Export, Custom App, 성능 측정, API 기능, 서비스 관리 등에 대해 심도깊게 학습합니다.
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    React 18과 함께 Next.js를 살펴봅니다.
                  </li>
                </ul>
              </li>
              <li className="mt-10 p-6 text-left text-black border-2 border-[#0BD5F9] rounded-lg bg-[#0BD5F9]">
                <span className="text-[#0BD5F9] border-2 border-black bg-black text-center text-2xl py-1 px-4 inline-block mb-2">Final Project.</span>
                <h5 className="relative text-2xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 04. 커머스 서비스 프로젝트 [약 6시간]
                </h5>
                <ul className="mt-3 text-lg">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    웹 서비스 기능 전반을 다루는 커머스 서비스 프로젝트의 구조를 만들고, API 도구와 스타일링 라이브러리에 대해 알아봅니다.
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    상세페이지 구현과 상품 목록, 카테고리 외 10가지 기능에 대해 학습 및 실습합니다.
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    Vercel로 서버리스하게 배포하고 프로젝트를 마무리하며, 웹 서비스 성능 최적화 접근법을 익힙니다.
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 bg-zinc-200">
        <div className="wrap">
          <h4 className="text-2xl font-bold text-center">강의 목표</h4>
          <ul className="mx-auto mt-6 text-center w-[80%]">
            <li className="py-5 bg-white rounded-lg">Next.js에 대한 기본, 심화 개념을 배우고, 실습을 통해 체화할 수 있습니다.</li>
            <li className="py-5 mt-5 bg-white rounded-lg">Next.js 프레임워크를 활용하여 어떤 웹서비스라도 빠르게 만들어낼 수 있다는 자신감을 갖습니다.</li>
            <li className="py-5 mt-5 bg-white rounded-lg">공식 문서&실습을 통해 이후에 새롭게 등장할 기술에 대해서도 스스로 학습할 수 있는 능력을 기릅니다.</li>
          </ul>
        </div>
      </section>
      <section className="py-20 bg-black">
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
      </section>
      <section className="py-20 bg-black">
        <div className="wrap">
          <h4 className="text-center text-white">
            <span className="text-xl">수강생들의 생생한 후기</span><br/>
            <b className="mt-4 text-3xl">REVIEW</b>
          </h4>
          <div className="">
            <div className="flex py-8">
              <div className="flex mx-8 w-[23rem] h-[23rem]">
                <img src="http://via.placeholder.com/230x230" alt="" loading="lazy" />
              </div>
              <div className="relative flex-1 p-12 ml-12 bg-white rounded-lg">
                <h5 className="text-2xl font-bold"><span className="block text-base text-primary">수강생</span>홍길동</h5>
                <div className="mt-2 font-bold">
                  <b>[프론트엔드 마스터반]</b>
                </div>
                <p className="relative text-lg py-10 px-6 mt-24 bg-[#f2f3f5] border-t-2 border-t-white border-l-2 border-l-[#f2f3f5] after:w-12 after:h-12 after:border-l-[3rem] after:border-l-[#f2f3f5] after:border-[3rem] after:border-[transparent] after:absolute after:top-[-3rem] after:left-[-0.1rem]">
                  구현까지만 할 줄 아는 개발자는 많습니다. 하지만 <b>유저에 대해 치열하게 고민하며 성능을 챙기는 개발자</b>는 드물죠. 이번 프로젝트 구성은 제가 경험해 온 
                  <b>프로덕트 도메인의 인사이트(금융 - 카드사 &amp; 개인예산관리 프로젝트, 여행 - 여행 프로젝트)를</b> 모두 모았습니다.
                  이 모든 강의는 프로덕트 도메인의 특성에 따라 <b>유저가 어떠한 것을 기대하고 불편해하는지 파악하며 최적화</b>가 진행됩니다. 
                  이를 통해 여러분은 유저에 대해 치열한 고민을 하고, 최적화까지 할 줄아는 개발자가 될 수 있습니다.  뿐만 아니라 부분 부분 최적화를 다루는 강의는 있지만, 
                  실제 실무 베이스로 서비스에 최적화를 적용해나가는 최적화 강의는 많지 않습니다. 이 강의는 <b>실제 실무 베이스로 최적화를 다루며 적용</b>해나갑니다. 
                  이 강의를 활용하신다면 개발하고 계시는 프로젝트에 강의 내용을 적용하고 <b>프론트엔드 개발자로서 UX를 고려한 최적화까지 이뤄낼 수 있다고 자신있게 말씀드립니다.</b>
                </p>
              </div>
            </div>
            <div className="flex py-8">
              <div className="relative flex-1 p-12 ml-12 bg-white rounded-lg">
                <h5 className="text-2xl font-bold text-right"><span className="block text-base text-primary">수강생</span>홍길동</h5>
                <div className="mt-2 font-bold text-right">
                  <b>[프론트엔드 마스터반]</b>
                </div>
                <p className="relative text-lg py-10 px-6 mt-24 bg-[#f2f3f5] border-t-2 border-t-white border-r-2 border-r-[#f2f3f5] after:w-12 after:h-12 after:border-r-[3rem] after:border-r-[#f2f3f5] after:border-[3rem] after:border-[transparent] after:absolute after:top-[-3rem] after:right-[-0.1rem]">
                  구현까지만 할 줄 아는 개발자는 많습니다. 하지만 <b>유저에 대해 치열하게 고민하며 성능을 챙기는 개발자</b>는 드물죠. 이번 프로젝트 구성은 제가 경험해 온 
                  <b>프로덕트 도메인의 인사이트(금융 - 카드사 &amp; 개인예산관리 프로젝트, 여행 - 여행 프로젝트)를</b> 모두 모았습니다.
                  이 모든 강의는 프로덕트 도메인의 특성에 따라 <b>유저가 어떠한 것을 기대하고 불편해하는지 파악하며 최적화</b>가 진행됩니다. 
                  이를 통해 여러분은 유저에 대해 치열한 고민을 하고, 최적화까지 할 줄아는 개발자가 될 수 있습니다.  뿐만 아니라 부분 부분 최적화를 다루는 강의는 있지만, 
                  실제 실무 베이스로 서비스에 최적화를 적용해나가는 최적화 강의는 많지 않습니다. 이 강의는 <b>실제 실무 베이스로 최적화를 다루며 적용</b>해나갑니다. 
                  이 강의를 활용하신다면 개발하고 계시는 프로젝트에 강의 내용을 적용하고 <b>프론트엔드 개발자로서 UX를 고려한 최적화까지 이뤄낼 수 있다고 자신있게 말씀드립니다.</b>
                </p>
              </div>
              <div className="flex mx-8 w-[23rem] h-[23rem]">
                <img src="http://via.placeholder.com/230x230" alt="" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="wrap">
          <div className="flex justify-between pb-10 border-b-1">
            <p className="w-1/2 mr-5">
              <b className="text-3xl">추천 대상.</b>
            </p>
            <p className="w-1/2 ">
            ∙ React.js에 대해 알고 있으나, 정작 웹서비스를 만드려면 어떻게 해야 할지 막막하신 분<br/>
            ∙ Next.js에 대해 관심이 있으나 혼자 학습하기에는 조금 부담되는 분<br/>
            ∙ 요즘 각광받는 웹서비스를 만드는 기술에 대해 관심이 있는 분<br/>
            ∙ 패스트캠퍼스 ‘한 번에 끝내는 프론트엔드 개발 초격차 패키지’, ‘한 번에 끝내는 React의 모든 것 초격차 패키지’ 와 같은 강의를 듣고 조금 더 실무에 가까운 프론트엔드 웹 서비스 개발에 필요성을 느끼는 분
            </p>
          </div>
          <div className="flex justify-between py-10 border-b-1">
            <p className="w-1/2 mr-5">
              <b className="text-3xl">수업 환경.</b>
            </p>
            <p className="w-1/2 ">
              <img src="http://via.placeholder.com/1080x274" />
              Node 16.15.1 (LTS) & ∙ VScode1.68
            </p>
          </div>
          <div className="grid grid-cols-2 gap-5 mt-10">
            <Accordion variant="splitted" className="px-0 font-bold">
              <AccordionItem key="1" aria-label="Accordion 1" title="기본정보">
                <ul className="py-3 border-t-1">
                  <li className="mt-2 text-base font-normal">・강의 및 강사 소개</li>
                </ul>
              </AccordionItem>
            </Accordion>
            <Accordion variant="splitted" className="px-0 font-bold">
              <AccordionItem key="1" aria-label="Accordion 2" title="강의특징">
              <ul className="py-3 border-t-1">
                  <li className="mt-2 text-base font-normal">・Next.js 소개 및 도구 / 환경 설정</li>
                  <li className="mt-2 text-base font-normal">・Next.js 로 만드는 사례 둘러보기(showcase / examples)</li>
                </ul>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
      <section className="py-20 bg-zinc-200">
        <div className="wrap">
          <h4 className="text-2xl font-bold">커리큘럼을 확인하세요.</h4>
          <p className="mt-3 text-base">
            아래의 모든 챕터 클립들을 강의 하나로 들을 수 있습니다.<br/>
            지금 한 번만 결제하고 모든 강의를 평생 소장하세요!<br/>
            <span className="text-primary">강의에서 어떤 실습을 진행하는지 클립명을 통해 확인하세요!</span>
          </p>
          <ul className="mt-10">
            <li>
              <p className="inline-block text-black border-2 border-[#61DAFB] font-bold bg-[#61DAFB] text-base rounded-lg px-2 py-1 mb-2">
                Part1. 오리엔테이션
              </p>
              <div className="grid grid-cols-2 gap-5">
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem key="1" aria-label="Accordion 1" title="Part1. 오리텐테이션">
                    <ul className="py-3 border-t-1">
                      <li className="mt-2 text-base font-normal">・강의 및 강사 소개</li>
                    </ul>
                  </AccordionItem>
                </Accordion>
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem key="1" aria-label="Accordion 2" title="02.NEXT.JS 소개">
                  <ul className="py-3 border-t-1">
                      <li className="mt-2 text-base font-normal">・Next.js 소개 및 도구 / 환경 설정</li>
                      <li className="mt-2 text-base font-normal">・Next.js 로 만드는 사례 둘러보기(showcase / examples)</li>
                    </ul>
                  </AccordionItem>
                </Accordion>
              </div>
            </li>
            <li className="mt-10">
              <p className="inline-block text-black border-2 border-[#61DAFB] font-bold bg-[#61DAFB] text-base rounded-lg px-2 py-1 mb-2">
                Part2. Next.js 시작하기
              </p>
              <div className="grid grid-cols-2 gap-5">
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem key="1" aria-label="Accordion 3" title="01. Next.js 기본 기능">
                  <ul className="py-3 border-t-1">
                      <li className="mt-2 text-base font-normal">・Next.js 기본 1(프레임워크 구조)</li>
                      <li className="mt-2 text-base font-normal">・Next.js 기본 2(Data Fetching)</li>
                      <li className="mt-2 text-base font-normal">・Next.js 기본 3(Layouts / Image)</li>
                      <li className="mt-2 text-base font-normal">・정리 1</li>
                      <li className="mt-2 text-base font-normal">・Next.js 기본 4(Routing)</li>
                      <li className="mt-2 text-base font-normal">・Next.js 기본 5(Shallow Routing)</li>
                      <li className="mt-2 text-base font-normal">・Next.js 기본 6(API Routes)</li>
                      <li className="mt-2 text-base font-normal">・정리 2</li>
                    </ul>
                  </AccordionItem>
                </Accordion>
              </div>
            </li>
            <li className="mt-10">
              <p className="inline-block text-black border-2 border-[#61DAFB] font-bold bg-[#61DAFB] text-base rounded-lg px-2 py-1 mb-2">
                Part3. Practice : 블로그 프로젝트
              </p>
              <div className="grid grid-cols-2 gap-5">
              <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem key="1" aria-label="Accordion 3" title="01. 연습 프로젝트 실습(블로그 만들기)">
                  <ul className="py-3 border-t-1">
                      <li className="mt-2 text-base font-normal">・프로젝트 시작(Link Component / Client-Side Naivgation)</li>
                      <li className="mt-2 text-base font-normal">・Layouts / Styling</li>
                      <li className="mt-2 text-base font-normal">・Pre-rendering / Data Fetching</li>
                      <li className="mt-2 text-base font-normal">・Dynamic Routes</li>
                      <li className="mt-2 text-base font-normal">・API Routes / 배포하기(1)</li>
                      <li className="mt-2 text-base font-normal">・API Routes / 배포하기(2)</li>
                      <li className="mt-2 text-base font-normal">・정리 1</li>
                    </ul>
                  </AccordionItem>
                </Accordion>
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem key="1" aria-label="Accordion 3" title="02. 블로그 커스텀해보기">
                  <ul className="py-3 border-t-1">
                      <li className="mt-2 text-base font-normal">・나만의 블로그 만들기(UI)(1)</li>
                      <li className="mt-2 text-base font-normal">・나만의 블로그 만들기(UI)(2)</li>
                      <li className="mt-2 text-base font-normal">・나만의 블로그 만들기(기능)(1)</li>
                      <li className="mt-2 text-base font-normal">・나만의 블로그 만들기(기능)(2)</li>
                    </ul>
                  </AccordionItem>
                </Accordion>
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem key="1" aria-label="Accordion 3" title="03. 프론트엔드 개발자를 위한 꿀팁">
                    <ul className="py-3 border-t-1">
                      <li className="mt-2 text-base font-normal">・프론트엔드 개발자가 알아야할 기술</li>
                      <li className="mt-2 text-base font-normal">・부족한 부분을 채우는 방법</li>
                    </ul>
                  </AccordionItem>
                </Accordion>
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem key="1" aria-label="Accordion 3" title="04. React 프로젝트 마이그레이션">
                    <ul className="py-3 border-t-1">
                      <li className="mt-2 text-base font-normal">・React Project Next.js로 마이그레이션 1 (CRA template)</li>
                      <li className="mt-2 text-base font-normal">・React Project Next.js로 마이그레이션 2 (React Router Dom)</li>
                    </ul>
                  </AccordionItem>
                </Accordion>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <section id="consult" className="py-20">
        <Form />
      </section>

      <section className="fixed bottom-0 left-0 z-50 w-full py-5">
        <div className="flex items-center justify-center">
          <div className="bg-[#222] text-[#aaaaaf] py-5 px-8 flex relative rounded-2xl items-center">
            <div className="flex items-center justify-between pr-[5rem]">
              <p className="flex flex-col justify-center flex-1 w-full pr-20 overflow-hidden">
                <strong className="text-xl">📣 마지막 10주년 특가를 놓치지 마세요! (~10/27)</strong>
                <span className="mt-2 line-clamp-1 max-w-[40rem]">상단 배너를 눌러 혜택을 확인해 보세요러 혜택해 보세요러 혜택해 보세요러 혜택해 보세요러 혜택해 보세요러 혜택해 보세요러 혜택해 보세요러 혜택을 확인해 보세요!</span>
              </p>
              <div className="mt-3">
                마감까지
                <Countdown targetDate={new Date('2023-12-25')} />
                남음
              </div>
            </div>
            <div className="text-[#aaaaaf]">
              <Button onPress={scrollToConsult} size="lg" variant="flat" className="text-white bg-[#c72835] rounded-lg">
                수강 신청 버튼
              </Button>
            </div>
          </div>
        </div>
      </section>
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
