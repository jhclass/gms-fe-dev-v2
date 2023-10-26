import { Accordion, AccordionItem } from "@nextui-org/react";

export default function Curriculum() {
  return (
    <>
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
            <div className="grid gap-5 md:grid-cols-1 lg:grid-cols-2">
              <Accordion defaultExpandedKeys={["1"]} variant="splitted" className="px-0 font-bold">
                <AccordionItem key="1" aria-label="Accordion 1" title="01. 오리텐테이션">
                  <ul className="py-3 border-t-1">
                    <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">강의 및 강사 소개</li>
                  </ul>
                </AccordionItem>
              </Accordion>
              <Accordion defaultExpandedKeys={["1"]} variant="splitted" className="px-0 font-bold">
                <AccordionItem key="1" aria-label="Accordion 2" title="02. NEXT.JS 소개">
                <ul className="py-3 border-t-1">
                    <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">Next.js 소개 및 도구 / 환경 설정</li>
                    <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">Next.js 로 만드는 사례 둘러보기(showcase / examples)</li>
                  </ul>
                </AccordionItem>
              </Accordion>
            </div>
          </li>
          <li className="mt-10">
            <p className="inline-block text-black border-2 border-[#61DAFB] font-bold bg-[#61DAFB] text-base rounded-lg px-2 py-1 mb-2">
              Part2. Next.js 시작하기
            </p>
            <div className="grid gap-5 md:grid-cols-1 lg:grid-cols-2">
              <Accordion variant="splitted" className="px-0 font-bold">
                <AccordionItem key="1" aria-label="Accordion 3" title="01. Next.js 기본 기능">
                <ul className="py-3 border-t-1">
                    <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">Next.js 기본 1(프레임워크 구조)</li>
                    <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">Next.js 기본 2(Data Fetching)</li>
                    <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">Next.js 기본 3(Layouts / Image)</li>
                    <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">정리 1</li>
                    <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">Next.js 기본 4(Routing)</li>
                    <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">Next.js 기본 5(Shallow Routing)</li>
                    <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">Next.js 기본 6(API Routes)</li>
                    <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">정리 2</li>
                  </ul>
                </AccordionItem>
              </Accordion>
            </div>
          </li>
          <li className="mt-10">
            <p className="inline-block text-black border-2 border-[#61DAFB] font-bold bg-[#61DAFB] text-base rounded-lg px-2 py-1 mb-2">
              Part3. Practice : 블로그 프로젝트
            </p>
            <div className="grid gap-5 md:grid-cols-1 lg:grid-cols-2">
            <Accordion variant="splitted" className="px-0 font-bold">
                <AccordionItem key="1" aria-label="Accordion 3" title="01. 연습 프로젝트 실습(블로그 만들기)">
                <ul className="py-3 border-t-1">
                    <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">프로젝트 시작(Link Component / Client-Side Naivgation)</li>
                    <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">Layouts / Styling</li>
                    <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">Pre-rendering / Data Fetching</li>
                    <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">Dynamic Routes</li>
                    <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">API Routes / 배포하기(1)</li>
                    <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">API Routes / 배포하기(2)</li>
                    <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">정리 1</li>
                  </ul>
                </AccordionItem>
              </Accordion>
              <Accordion variant="splitted" className="px-0 font-bold">
                <AccordionItem key="1" aria-label="Accordion 3" title="02. 블로그 커스텀해보기">
                <ul className="py-3 border-t-1">
                    <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">나만의 블로그 만들기(UI)(1)</li>
                    <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">나만의 블로그 만들기(UI)(2)</li>
                    <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">나만의 블로그 만들기(기능)(1)</li>
                    <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">나만의 블로그 만들기(기능)(2)</li>
                  </ul>
                </AccordionItem>
              </Accordion>
              <Accordion variant="splitted" className="px-0 font-bold">
                <AccordionItem key="1" aria-label="Accordion 3" title="03. 프론트엔드 개발자를 위한 꿀팁">
                  <ul className="py-3 border-t-1">
                    <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">프론트엔드 개발자가 알아야할 기술</li>
                    <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">부족한 부분을 채우는 방법</li>
                  </ul>
                </AccordionItem>
              </Accordion>
              <Accordion variant="splitted" className="px-0 font-bold">
                <AccordionItem key="1" aria-label="Accordion 3" title="04. React 프로젝트 마이그레이션">
                  <ul className="py-3 border-t-1">
                    <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">React Project Next.js로 마이그레이션 1 (CRA template)</li>
                    <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">React Project Next.js로 마이그레이션 2 (React Router Dom)</li>
                  </ul>
                </AccordionItem>
              </Accordion>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}