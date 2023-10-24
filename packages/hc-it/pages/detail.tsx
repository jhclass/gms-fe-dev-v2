import Link from "next/link";
import React from "react";
import Form from "@/components/Form";
import DetailFixed from "@/components/DetailFixed";
import Curriculum from "@/components/Curriculum";
import DetailInfo from "@/components/DetailInfo";
import Review from "@/components/Review";
import Portfolio from "@/components/Portfolio";

export default function Detail() {


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
        <Portfolio />
      </section>
      <section className="py-20 bg-black">
        <Review />
      </section>
      <section className="py-20">
        <DetailInfo />
      </section>
      <section className="py-20 bg-zinc-200">
        <Curriculum />
      </section>
      <section id="consult" className="py-20">
        <Form />
      </section>
      <DetailFixed />
    </>
  );
}
