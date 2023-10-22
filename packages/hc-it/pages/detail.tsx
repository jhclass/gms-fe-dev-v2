import { Accordion, AccordionItem } from "@nextui-org/react";
import Link from "next/link";

export default function Detail() {
  return (
    <>
      <section className="bg-black">
        <div className="text-center wrap">
          <p className="text-white max-w-[98rem] text-6xl">
          <span className="text-black border-2 border-[#61DAFB] bg-[#61DAFB] rounded-lg text-center text-xl font-bold px-2 py-1 mb-2">
          프로젝트로 배우는
          </span>
          <br/>
          <b className="text-3xl"> 
            Next.js 완전 정복<br/>
            확장성 높은 커머스 서비스 구축하기
          </b>
          </p>
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
      <section className="bg-[rgb(9, 2, 4)]">
        <div className="wrap">
          <Link href={""}>
            <img src="" />
          </Link>
        </div>
      </section>
      <section className="pt-10 bg-black">
        <div className="wrap">
          <h4 className="text-center text-white">
            <span className="text-xl">현재 토스증권 프론트엔드 챕터 리드로 재직 중인</span><br/>
            <b className="mt-4 text-3xl">최지민 강사님을 만나보세요.</b>
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
            <span className="text-xl">Next.js, 시작할지 말지 고민하셨다면?</span><br/>
            <b className="mt-4 text-3xl">지금 이 강의로 시작해야 하는 6가지 이유</b>
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
          <h4 className="text-2xl font-bold text-center">강의 목표</h4>
          <ul className="mx-auto mt-6 text-center w-[80%]">
            <li className="py-5 bg-white rounded-lg">Next.js에 대한 기본, 심화 개념을 배우고, 실습을 통해 체화할 수 있습니다.</li>
            <li className="py-5 mt-5 bg-white rounded-lg">Next.js 프레임워크를 활용하여 어떤 웹서비스라도 빠르게 만들어낼 수 있다는 자신감을 갖습니다.</li>
            <li className="py-5 mt-5 bg-white rounded-lg">공식 문서&실습을 통해 이후에 새롭게 등장할 기술에 대해서도 스스로 학습할 수 있는 능력을 기릅니다.</li>
          </ul>
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
    </>
  );
}
