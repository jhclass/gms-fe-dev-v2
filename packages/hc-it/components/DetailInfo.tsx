import { Accordion, AccordionItem } from "@nextui-org/react";

export default function DetailInfo() {
  return (
    <>
      <div className="wrap">
        <div className="flex justify-between pb-10 md:flex-wrap border-b-1">
          <p className="lg:w-1/2 md:w-full md:mb-5">
            <b className="text-3xl">추천 대상.</b>
          </p>
          <p className="text-base lg:w-1/2 md:w-full">
          ∙ React.js에 대해 알고 있으나, 정작 웹서비스를 만드려면 어떻게 해야 할지 막막하신 분<br/>
          ∙ Next.js에 대해 관심이 있으나 혼자 학습하기에는 조금 부담되는 분<br/>
          ∙ 요즘 각광받는 웹서비스를 만드는 기술에 대해 관심이 있는 분<br/>
          ∙ 패스트캠퍼스 ‘한 번에 끝내는 프론트엔드 개발 초격차 패키지’, ‘한 번에 끝내는 React의 모든 것 초격차 패키지’ 와 같은 강의를 듣고 조금 더 실무에 가까운 프론트엔드 웹 서비스 개발에 필요성을 느끼는 분
          </p>
        </div>
        <div className="flex justify-between py-10 md:flex-wrap border-b-1">
          <p className="lg:w-1/2 md:w-full md:mb-5">
            <b className="text-3xl">수업 환경.</b>
          </p>
          <p className="text-base lg:w-1/2 md:w-full">
            <img src="http://via.placeholder.com/1080x274" />
            Node 16.15.1 (LTS) & ∙ VScode1.68
          </p>
        </div>
        <div className="grid gap-5 mt-10 md:grid-cols-1 lg:grid-cols-2">
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
    </>
  );
}