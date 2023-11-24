import React from 'react'
import Form from '@/components/Form'
import DetailFixed from '@/components/section/DetailFixed'
import Portfolio from '@/components/section/Portfolio'
import TopBnr from '@/components/section/TopBnr'
import { Accordion, AccordionItem } from '@nextui-org/react'
import ReviewSlide from '@/components/section/ReviewSlide'

const list = [
  {
    name: '김○○',
    img: '/src/detail/user_m.webp',
    content:
      '수강생입니다. 수업시간 집중력있게 강좌를 들었습니다. 매 강의시간 열정을 갖고 수업해주신 선생님께 감사드립니다. 전문적인 지식을 쉽게 이해했습니다. 주변사람에게도 추천해주고 싶은 매시간 재밌는 강의였습니다!',
    class: '웹툰 스토리',
    rating: 5.0,
    backgroundColor: '#f87171',
  },
  {
    name: '최○○',
    img: '/src/detail/user_w.webp',
    content:
      '비기초부터 자세히 설명해주시고 모르거나 어렵게 느껴지는 부분을 질문했을 때 적극적으로 잘 설명해주셨습니다. 선생님의 열정이 느껴지는 수업이었습니다.',
    class: '웹툰 배경',
    rating: 5.0,
    backgroundColor: '#1d4ed8',
  },
  {
    name: '이○○',
    img: '/src/detail/user_w.webp',
    content: '담당 강사님의 친절하고 적절한 수업이 매우 좋았습니다.',
    class: '웹툰 캐릭터',
    rating: 4.3,
    backgroundColor: '#fbcfe8',
  },
  {
    name: '박○○',
    img: '/src/detail/user_w.webp',
    content:
      '강사님이 굉장히 열성적이시며 문의사항에 빠른 피드백을 주십니다. 완전 초보들의 수준을 고려하여 설명 해주셨습니다.',
    class: '웹툰 캐릭터',
    rating: 5.0,
    backgroundColor: '#f97316',
  },
  {
    name: '정○○',
    img: '/src/detail/user_m.webp',
    content: '기초 개념과 업무수행 자신감이 확립되었다고 봅니다.',
    class: '웹툰 캐릭터',
    rating: 4.5,
    backgroundColor: '#10b981',
  },
  {
    name: '홍○○',
    img: '/src/detail/user_m.webp',
    content:
      '그림을 거의 그려본 적이 없던 터라, 인체 드로잉에 대한 지식을 얻고 클립스튜디오로 실습해 볼 수 있어서 유의미한 시간이었습니다. 투시도법을 간략하게 배울 수 있어서 괜찮았습니다',
    class: '웹툰 캐릭터',
    rating: 4.7,
    backgroundColor: '#818cf8',
  },
  {
    name: '윤○○',
    img: '/src/detail/user_m.webp',
    content:
      '강사님께서 자세하게 설명해주셔서 초보자인 저도 수업을 잘 들었습니다. 강의내용을 기록한 자료를 다운받게 해주셔서 도움이 많이 됐습니다.',
    class: '웹툰 캐릭터',
    rating: 5.0,
    backgroundColor: '#f43f5e',
  },
  {
    name: '최○○',
    img: '/src/detail/user_w.webp',
    content:
      '클립 스튜디오를 완전히 처음 접하시는 분들께는 좋을 것 같습니다! 이직준비 도중에 수강하게 되었는데요. 새로운 툴 지식 습득(클립스튜디오)에 좋은 수업이었으며 받은 교재도 깔끔했습니다. 학원 시설도 나쁘지 않았습니다. 좋은 수업 감사합니다.',
    class: '웹툰 캐릭터',
    rating: 5.0,
    backgroundColor: '#fb923c',
  },
  {
    name: '류○○',
    img: '/src/detail/user_w.webp',
    content: '강사님께서 강의노트 기록해주셔서 정말 좋았습니다!!',
    class: '웹툰 캐릭터',
    rating: 4.6,
    backgroundColor: '#be123c',
  },
  {
    name: '박○○',
    img: '/src/detail/user_m.webp',
    content:
      '3시간 온전히 그림에 집중 할 수 있어서 좋았습니다. 수업 중에 많은 캐릭터들을 구상하고 그릴 수 있어서 저에게도 많이 남는 수업이었습니다.',
    class: '웹툰 캐릭터',
    rating: 4.8,
    backgroundColor: '#0e7490',
  },
  {
    name: '이○○',
    img: '/src/detail/user_w.webp',
    content:
      '늘 그리던 방식이 아닌 새로운 관점에서 그리는 것도 새로운 재미있었어요! 강사님이 실제 현장에 계신 분이라 수업이 자세하고 실용성이 높았습니다. 저는 작가가 아닌 웹툰PD 지망인지라 강의에 맞는 실력이 아니였음에도 배려해주셔서 감사했습니다. 만약 웹툰 작가를 지망하시는 분이라면 유익하고 도움이 되는 강의라고 생각합니다.',
    class: '웹툰 캐릭터',
    rating: 5,
    backgroundColor: '#d8b4fe',
  },
  {
    name: '정○○',
    img: '/src/detail/user_m.webp',
    content:
      '질문을 하면 잘 알려주셔서 좋았어요. 이것 저것 웹툰 관련 내용을 많이 알려주셔서 좋았어요',
    class: '웹툰 캐릭터',
    rating: 4.3,
    backgroundColor: '#38bdf8',
  },
  {
    name: '김○○',
    img: '/src/detail/user_w.webp',
    content:
      '인체 비율 등 기본기를 배우고 싶었는데 도움이 많이 되었습니다. 완전 쌩 초보라서 걱정했는데 강사 선생님이 꼼꼼하게 기초부처 설명 해주셔서 도움 많이 되었습니다. 강의 내용이 매우 유익하면서 재미있었습니다. 강의를 체계적으로 진행하면서도 수강생들의 자유도가 높기 때문에, 배운 내용을 토대로 곧장 원하는 작업을 할 수 있는 환경이 조성되어있습니다. 자신의 실력을 빠르게 시험하면서 갈고 닦고 싶다면 강력하게 추천드립니다. 선생님께서 꼼꼼하게 알려주려고 하시고 모르는 부분 다시 여쭤보면 친절하게 답변해주십니다! 웹툰에 처음 입문하려는 분들이 들으시면 매우 좋은 강의입니다! 가르쳐주시느라 고생 많으셨습니다!',
    class: '웹툰 캐릭터',
    rating: 5,
    backgroundColor: '#5b21b6',
  },
  {
    name: '이○○',
    img: '/src/detail/user_m.webp',
    content:
      '이 분야가 완전 처음이라 걱정이 많았지만 강사님께서 친절하게 지도해주셨습니다. 수업내용이나 수업방향, 모르는 내용은 즉각적으로 피드백이 이루어져서 낙오되는 일도 없었고, 수강생들 수준에 맞춰서 맞춤으로 설명해주셔서 더 좋았습니다. 웹툰에 대한 기초적인 지식을 쌓는데 충분한 커리큘럼이며 강사님도 성실하셨습니다.',
    class: '웹툰 캐릭터',
    rating: 5,
    backgroundColor: '#16a34a',
  },
]

export default function Detail() {
  const scrollTo = (target: string): void => {
    const consultSection = document.getElementById(target)
    if (consultSection) {
      const header = document.querySelector('header')
      const headerHeight = header ? header.clientHeight : 0
      const targetSectionTop =
        consultSection.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: targetSectionTop - headerHeight,
        behavior: 'smooth',
      })
    }
  }

  return (
    <>
      <TopBnr />
      <section className="bg-black">
        <div className="text-center wrap">
          <p className="pt-20 text-center text-white">
            <span className="inline-block text-black border-2 border-[#F28705] bg-[#F28705] rounded-lg text-center text-xl font-bold px-2 py-1">
              웹툰작가에게 배우는
            </span>
            <br />
            <b className="inline-block mt-5 text-4xl/[3rem]">
              웹툰제작과정
              <span className="text-2xl/[3rem] pl-3">Webtoon</span>
            </b>
          </p>
          <figure className="w-full mx-auto mt-10">
            <img src="/src/detail/d2_main_section03.webp" />
          </figure>
        </div>
      </section>
      <section className="pt-16 bg-black">
        <div className="wrap">
          <h4 className="text-center text-white">
            <span className="text-2xl">웹툰제작을 원하신다면?</span>
            <br />
            <b className="mt-4 text-3xl">
              지금 이 수업을 들어야 하는 4가지 이유
            </b>
          </h4>
          <ul className="grid gap-8 mt-10 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
            <li className="flex items-center py-10 pl-5 pr-10 bg-white rounded-lg">
              <p className="w-1/6 mr-3 text-center text-7xl">1</p>
              <p className="w-5/6 text-sm text-zinc-600">
                <span className="text-xl font-bold text-black mb-7">
                  사전평가를 통한 난이도 조절 🔥
                </span>
                <br />
                입문자도, 스킬업을 원하는 사람도 사전평가를 통해 원하는 분
                누구나 나의 실력부터 시작할 수 있습니다.
              </p>
            </li>
            <li className="flex items-center py-10 pl-5 pr-10 bg-white rounded-lg">
              <p className="w-1/6 mr-3 text-center text-7xl">2</p>
              <p className="w-5/6 text-sm text-zinc-600">
                <span className="text-xl font-bold text-black mb-7">
                  입학상담을 통한 목적 달성 🍭
                </span>
                <br />
                취미로 배우려는 사람, 작가데뷔, 취업, 프리랜서를 꿈꾸는 사람
                모두 입학상담을 통해 목표를 설정해 목적을 이룰 수 있습니다.
              </p>
            </li>
            <li className="flex items-center py-10 pl-5 pr-10 bg-white rounded-lg">
              <p className="w-1/6 mr-3 text-center text-7xl">3</p>
              <p className="w-5/6 text-sm text-zinc-600">
                <span className="text-xl font-bold text-black mb-7">
                  웹툰작가님이 만는 커리큘럼 ⭐️
                </span>
                <br />
                웹툰작가님이 실력을 점점 쌓아올리며 입문자도 쉽게 따라 올 수
                있도록 커리큘럼을 구성하였습니다.
              </p>
            </li>
            <li className="flex items-center py-10 pl-5 pr-10 bg-white rounded-lg">
              <p className="w-1/6 mr-3 text-center text-7xl">4</p>
              <p className="w-5/6 text-sm text-zinc-600">
                <span className="text-xl font-bold text-black mb-7">
                  개인맞춤형 수업 😄
                </span>
                <br />
                단계별 결과물을 평가하고 나의 실력에 맞는 1:1피드백을 통해 개인
                맞춤형 수업을 제공합니다.
              </p>
            </li>
          </ul>
        </div>
      </section>
      <section className="py-16 bg-black">
        <div className="wrap">
          <p className="text-white">
            <b className="mt-4 text-2xl">웹툰 배경 제작</b>
            <br />
            <span className="inline-block text-lg">
              스케치업을 활용한 웹툰배경 이미지
            </span>
          </p>
          <figure className="w-full mt-10 overflow-hidden">
            <img src="/src/detail/d2_img_section.webp" width="100%" />
          </figure>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="wrap">
          <div className="text-center">
            <p className="inline-block px-4 py-2 text-sm font-bold text-center text-white bg-[#F28705] border-2 border-[#F28705] rounded-lg">
              Flowchart
            </p>
            <ul className="mx-auto mt-10 lg:w-full xl:w-4/5">
              <li className="relative p-6 mb-20 text-left text-[#021226] border-2 border-[#71717a] rounded-lg">
                <span className="absolute bottom-[-5rem] text-[#F28705] left-[50%] text-6xl ml-[-1.5rem]">
                  <i className="xi-angle-down" />
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 01. 웹툰의 이해
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    하드웨어 및 소프트웨어의 이해 (tablet, Cintiq, CLIP STUDIO,
                    Photoshop 등)
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    웹툰제작 시 사용되는 툴의 환경설정 및 실습 (클립스튜디오,
                    포토샵)
                  </li>
                  <li className="relative pt-5 pl-4 mt-5 border-[#71717a] border-t-1">
                    웹툰제작을 시작하기에 앞서 웹툰제작에 사용되는 하드웨어와
                    소프트웨어의 종류 및 활용법을 이해하고 각각의 활용 예시 등을
                    통해 사용법을 익힐 수 있습니다.
                  </li>
                </ul>
              </li>
              <li className="relative p-6 mb-20 text-left text-[#021226] border-2 border-[#71717a] rounded-lg">
                <span className="absolute bottom-[-5rem] text-[#F28705] left-[50%] text-6xl ml-[-1.5rem]">
                  <i className="xi-angle-down" />
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 02. 드로잉의 이해 및 실습
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    기초 인체드로잉 (손, 발, 몸, 다리, 얼굴, 헤어 등)
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    크로키, 모작 등 다양한 방법을 통한 인체 익히기
                  </li>
                  <li className="relative flex gap-5 lg:gap-10pt-5 pt-5 pl-4 justify-between mt-5 border-[#71717a] border-t-1 flex-col lg:flex-row">
                    <div className="max-w-[50%]">
                      인체의 기본 비율, 캐릭터 두상의 비율 및 형태, 근육을 통한
                      인체의 연결과 윤곽, 인체 무게 중심, 옷 주름과 신발, 얼굴
                      표정 등 다양한 인체비율 연구를 통해 인체 드로잉을 이해할
                      수 있습니다.
                    </div>
                    <div className="flex items-center justify-center gap-5">
                      <figure>
                        <img
                          src="/src/detail/flowchart01.webp"
                          alt="Step 02. 드로잉의 이해 및 실습"
                          className="w-full"
                        />
                      </figure>
                      <figure>
                        <img
                          src="/src/detail/flowchart02.webp"
                          alt="Step 02. 드로잉의 이해 및 실습"
                          className="w-full"
                        />
                      </figure>
                      <figure className="max-w-full">
                        <img
                          src="/src/detail/flowchart03.webp"
                          alt="Step 02. 드로잉의 이해 및 실습"
                          className="w-full"
                        />
                      </figure>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="relative p-6 mb-20 text-left text-[#021226] border-2 border-[#71717a] rounded-lg">
                <span className="absolute bottom-[-5rem] text-[#F28705] left-[50%] text-6xl ml-[-1.5rem]">
                  <i className="xi-angle-down" />
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 03. 펜선 및 채색
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    펜선 실습 (클립스튜디오 툴을 통한 다양한 브러시 도구와 응용)
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    채색 실습 (기본 채색 및 명암 활용법과 레이어 및 효과를
                    이용한 응용)
                  </li>
                  <li className="relative pt-5 pl-4 mt-5 border-[#71717a] border-t-1">
                    클립스튜디오의 다양한 브러시 도구를 이용한 펜선 연습을 통해
                    다양한 펜선의 종류를 이해할 수 있고, 다양한 채색 활용 예시를
                    통해 채색 및 명암 활용법 등을 익힐 수 있습니다.
                  </li>
                </ul>
              </li>
              <li className="relative p-6 mb-20 text-left text-[#021226] border-2 border-[#71717a] rounded-lg">
                <span className="absolute bottom-[-5rem] text-[#F28705] left-[50%] text-6xl ml-[-1.5rem]">
                  <i className="xi-angle-down" />
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 04. 원고의 이해 및 실습 Part.1
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    1컷 완성
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    글콘티 및 콘티, 러프스케치, 펜선 및 채색, 원고 과정의 이해
                    및 실습
                  </li>
                  <li className="relative flex gap-5 lg:gap-10pt-5 pt-5 pl-4 justify-between mt-5 border-[#71717a] border-t-1 flex-col lg:flex-row">
                    <div className="max-w-[50%]">
                      원고가 어떻게 완성되는지 간단한 예시를 보고 원고 중 1컷
                      완성을 목표로 합니다.
                    </div>
                    <div className="flex items-center justify-center gap-5">
                      <figure>
                        <img
                          src="/src/detail/flowchart04.webp"
                          alt="Step 04. 원고의 이해 및 실습 Part.1"
                        />
                      </figure>
                      <figure>
                        <img
                          src="/src/detail/flowchart05.webp"
                          alt="Step 04. 원고의 이해 및 실습 Part.1"
                        />
                      </figure>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="relative p-6 mb-20 text-left text-[#021226] border-2 border-[#71717a] rounded-lg">
                <span className="absolute bottom-[-5rem] text-[#F28705] left-[50%] text-6xl ml-[-1.5rem]">
                  <i className="xi-angle-down" />
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 05. 캐릭터 및 인체 연구
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    내가 원하는 캐릭터 만들기
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    캐릭터에 맞는 인체연습
                  </li>
                  <li className="relative flex gap-5 lg:gap-10pt-5 pt-5 pl-4 justify-between mt-5 border-[#71717a] border-t-1 flex-col lg:flex-row">
                    <div className="max-w-[50%]">
                      기성작가들의 작품 중 본인이 생각하는 이미지와 어울리는
                      캐릭터를 모작해 보고, 내가 구상하고 있는 스토리와 접목시켜
                      내가 원하는 캐릭터를 만들어 봅니다.
                    </div>
                    <div className="flex items-center justify-center gap-5">
                      <figure>
                        <img
                          src="/src/detail/flowchart07.webp"
                          alt="Step 05. 캐릭터 및 인체 연구"
                        />
                      </figure>
                      <figure>
                        <img
                          src="/src/detail/flowchart08.webp"
                          alt="Step 05. 캐릭터 및 인체 연구"
                        />
                      </figure>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="relative p-6 mb-20 text-left text-[#021226] border-2 border-[#71717a] rounded-lg">
                <span className="absolute bottom-[-5rem] text-[#F28705] left-[50%] text-6xl ml-[-1.5rem]">
                  <i className="xi-angle-down" />
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 06. 내가 원하는 캐릭터 완성
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    캐릭터 펜선 및 채색
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    흉상, 반신상, 전신 완성하기
                  </li>
                  <li className="relative flex gap-5 lg:gap-10pt-5 pt-5 pl-4 justify-between mt-5 border-[#71717a] border-t-1 flex-col lg:flex-row">
                    <div className="max-w-[50%]">
                      내가 원하는 캐릭터 샘플을 완성하고 캐릭터 설정에 나오는
                      흉상, 반신상, 전신을 완성해 봅니다.
                    </div>
                    <div className="flex items-center justify-center gap-5">
                      <figure>
                        <img
                          src="/src/detail/flowchart09.webp"
                          alt="Step 06. 내가 원하는 캐릭터 완성"
                        />
                      </figure>
                      <figure>
                        <img
                          src="/src/detail/flowchart10.webp"
                          alt="Step 06. 내가 원하는 캐릭터 완성"
                        />
                      </figure>
                      <figure>
                        <img
                          src="/src/detail/flowchart11.webp"
                          alt="Step 06. 내가 원하는 캐릭터 완성"
                        />
                      </figure>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="relative p-6 mb-20 text-left text-[#021226] border-2 border-[#71717a] rounded-lg">
                <span className="absolute bottom-[-5rem] text-[#F28705] left-[50%] text-6xl ml-[-1.5rem]">
                  <i className="xi-angle-down" />
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 07. 배경의 이해와 실습
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    투시법(기본 1,2,3점 투시, 투시별 연출 및 활용 방법)
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    스케치업을 활용한 배경제작 및 3D 이질감 보정
                  </li>
                  <li className="relative flex gap-5 lg:gap-10pt-5 pt-5 pl-4 justify-between mt-5 border-[#71717a] border-t-1 flex-col lg:flex-row">
                    <div className="max-w-[50%]">
                      투시를 이용한 인물을 그려보며 투시법, 투시별 연출 및 활용
                      방법 등 배경연출을 이해할 수 있고, 스케치업을 통해 3D
                      배경을 제작하거나 활용할 수 있습니다.
                    </div>
                    <div className="flex items-center justify-center gap-5">
                      <figure>
                        <img
                          src="/src/detail/flowchart12.webp"
                          alt="Step 07. 배경의 이해와 실습"
                        />
                      </figure>
                      <figure>
                        <img
                          src="/src/detail/flowchart13.webp"
                          alt="Step 07. 배경의 이해와 실습"
                        />
                      </figure>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="relative p-6 mb-20 text-left text-[#021226] border-2 border-[#71717a] rounded-lg">
                <span className="absolute bottom-[-5rem] text-[#F28705] left-[50%] text-6xl ml-[-1.5rem]">
                  <i className="xi-angle-down" />
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 08. 원고의 이해 및 실습 Part.2
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    4컷 완성
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    글콘티 및 콘티, 러프스케치, 펜선 및 채색, 원고 과정의 이해
                    및 실습
                  </li>
                  <li className="relative flex gap-5 lg:gap-10pt-5 pt-5 pl-4 justify-between mt-5 border-[#71717a] border-t-1 flex-col lg:flex-row">
                    <div className="max-w-[50%]">
                      내가 만든 캐릭터와 배경을 기반으로 원고시안의 개인별
                      피드백을 통해 4컷 원고 완성을 목표로 합니다.
                    </div>
                    <div className="flex items-center justify-center gap-5">
                      <figure>
                        <img
                          src="/src/detail/flowchart14.webp"
                          alt="Step 08. 원고의 이해 및 실습 Part.2"
                        />
                      </figure>
                      <figure>
                        <img
                          src="/src/detail/flowchart15.webp"
                          alt="Step 08. 원고의 이해 및 실습 Part.2"
                        />
                      </figure>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="relative p-6 mb-20 text-left text-[#021226] border-2 border-[#71717a] rounded-lg">
                <span className="absolute bottom-[-5rem] text-[#F28705] left-[50%] text-6xl ml-[-1.5rem]">
                  <i className="xi-angle-down" />
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 09. 스토리 작법
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    다양한 장르의 스토리와 스토리의 전개방식에 대한 이해
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    재미있는 소재를 만드는 6가지 방법
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    사건의 중심이 되는 3명의 캐릭터 설정
                  </li>
                  <li className="relative flex gap-5 lg:gap-10pt-5 pt-5 pl-4 justify-between mt-5 border-[#71717a] border-t-1 flex-col lg:flex-row">
                    <div className="max-w-[50%]">
                      다양한 스토리의 활용 및 적용 예시를 통해 스토리 작법 이론
                      및, 스토리를 어떻게 시작할 것인지, 나에게 맞는 장르는 어떤
                      것인지 파악하고 나만의 스토리를 작성할 수 있습니다.
                    </div>
                    <div className="flex items-center justify-center gap-5">
                      <figure>
                        <img
                          src="/src/detail/flowchart16.webp"
                          alt="Step 09. 스토리 작법"
                        />
                      </figure>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="relative p-6 mb-20 text-left text-[#021226] border-2 border-[#71717a] rounded-lg">
                <span className="absolute bottom-[-5rem] text-[#F28705] left-[50%] text-6xl ml-[-1.5rem]">
                  <i className="xi-angle-down" />
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 10. 연출 이론
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    연출에 대한 기초 이론 ( 샷과 앵글을 통한 연출, 각도와 대조의
                    연출, 컷에 대한 이해)
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    다양한 장르의 연출 (ex 일상, 판타지, 스릴러 등 장르에 따른
                    다양한 연출연구)
                  </li>
                  <li className="relative flex gap-10 pt-5 pl-4 justify-between mt-5 border-[#71717a] border-t-1">
                    <div className="max-w-[50%]">
                      다양한 연출법에 대한 기초이론의 학습을 통해 스토리의 전개,
                      장르, 시간의 흐름에 따라 나의 작품을 연출할 수 있습니다.
                    </div>
                    <div className="flex items-center justify-center gap-5">
                      <figure>
                        <img
                          src="/src/detail/flowchart17.webp"
                          alt="Step 10. 연출 이론"
                        />
                      </figure>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="relative p-6 mb-20 text-left text-[#021226] border-2 border-[#71717a] rounded-lg">
                <span className="absolute bottom-[-5rem] text-[#F28705] left-[50%] text-6xl ml-[-1.5rem]">
                  <i className="xi-angle-down" />
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 11. 연출의 이론 및 실습
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    인물의 성격, 감정표현 등에 따른 연출 활용
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    배경, 채색의 연출 활용(긴장감, 추격패턴, 혼란, 시선의
                    흐름으로 컷의 연결 및 전조)
                  </li>
                  <li className="relative flex gap-5 lg:gap-10pt-5 pt-5 pl-4 justify-between mt-5 border-[#71717a] border-t-1 flex-col lg:flex-row">
                    <div className="max-w-[50%]">
                      다양한 연출방법의 학습을 통해 단지 그리는 것이 아니라
                      인물과 배경, 오브제 등 디테일한 부분들의 연출 활용법을
                      배우고 본인이 만든 스토리를 더욱 생동감 있게 연출할 수
                      있습니다.
                    </div>
                    <div className="flex items-center justify-center gap-5">
                      <figure>
                        <img
                          src="/src/detail/flowchart18.webp"
                          alt="Step 11. 연출의 이론 및 실습"
                        />
                      </figure>
                      <figure>
                        <img
                          src="/src/detail/flowchart19.webp"
                          alt="Step 11. 연출의 이론 및 실습"
                        />
                      </figure>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="relative p-6 mb-20 text-left text-[#021226] border-2 border-[#71717a] rounded-lg">
                <span className="absolute bottom-[-5rem] text-[#F28705] left-[50%] text-6xl ml-[-1.5rem]">
                  <i className="xi-angle-down" />
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 12. 원고의 이해 및 실습 Part.3
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    프롤로그 완성
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    글콘티 및 콘티, 러프스케치, 펜선 및 채색, 원고 과정의 이해
                    및 실습
                  </li>
                  <li className="relative flex gap-5 lg:gap-10pt-5 pt-5 pl-4 justify-between mt-5 border-[#71717a] border-t-1 flex-col lg:flex-row">
                    <div className="max-w-[50%]">
                      본인이 만든 스토리의 프롤로그를 만들어 봅니다. 수차례
                      원고를 거듭하면서 원고에 시작과 마무리에 대한 감을
                      익힙니다.
                    </div>
                    <div className="flex items-center justify-center gap-5">
                      <figure>
                        <img
                          src="/src/detail/flowchart20.webp"
                          alt="Step 12. 원고의 이해 및 실습 Part.3"
                        />
                      </figure>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="mt-10 p-6 text-left text-[#021226] border-2 border-[#F28705] rounded-lg bg-[#F28705]">
                <span className="text-[#F28705] border-2 border-[#021226] bg-[#021226] text-center text-xl py-1 px-4 inline-block mb-2">
                  Portfolio.
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 13. 단편 웹툰 제작
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    시놉시스 작성
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    캐릭터 시트 그리기
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    글, 그림 콘티 작성
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    단편 원고 작업, 편집
                  </li>
                  <li className="relative flex gap-5 lg:gap-10pt-5 pt-5 pl-4 justify-between mt-5 border-[#71717a] border-t-1 flex-col lg:flex-row">
                    <div className="max-w-[50%]">
                      작가 데뷔 및 취업을 위한 포트폴리오 제작
                    </div>
                    <div className="flex items-center justify-center gap-5">
                      <figure>
                        <img
                          src="/src/detail/flowchart21.webp"
                          alt="Step 13. 단편 웹툰 제작"
                        />
                      </figure>
                      <figure>
                        <img
                          src="/src/detail/flowchart22.webp"
                          alt="Step 13. 단편 웹툰 제작"
                        />
                      </figure>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-16 bg-[#F2F2F2]">
        <div className="wrap">
          <h4 className="text-center text-black">
            <span className="text-2xl">수강생들의 생생한 후기</span>
            <br />
            <b className="mt-4 text-3xl">REVIEW</b>
          </h4>
          <div className="mt-4">
            <div className="flex flex-col py-6 lg:flex-row even:lg:flex-row-reverse">
              <div className="flex mx-auto mb-5 w-[15rem] h-[15rem] lg:mx-8 lg:w-[21rem] lg:h-[21rem]">
                <figure className="w-full h-full p-3 overflow-hidden bg-teal-500 rounded-full">
                  <img
                    src="/src/detail/user_w.webp"
                    alt="김○○의 포트폴리오"
                    loading="lazy"
                    width="100%"
                  />
                </figure>
              </div>
              <div className="relative flex-1 p-6 bg-white rounded-lg lg:p-10 lg:ml-12 even:lg:mr-12">
                <h5 className="text-2xl font-bold text-right">
                  <span className="block text-base text-primary">
                    <b className="text-zinc-600">웹툰 배경</b> 수강생
                  </span>
                  김○○
                </h5>
                <div className="flex flex-col mt-3 text-3xl font-bold items-left even:items-end">
                  <p>
                    <span className="text-primary">5.0</span> / 5
                  </p>
                  <span
                    style={{ width: `${1.45 * 5}rem` }}
                    className="h-[1.2rem] display star_bg"
                  ></span>
                </div>
                <p className="relative text-base py-6 px-6 mt-16 bg-[#f2f3f5] border-t-2 border-t-white border-l-2 border-l-[#f2f3f5] after:w-12 after:h-12 after:border-l-[3rem] after:border-l-[#f2f3f5] after:border-[3rem] after:border-[transparent] after:absolute after:top-[-3rem] after:left-[-0.1rem]">
                  <b>완벽함 최고의 명강</b> 클립스튜디오 사용법을 배웠다.
                  처음으로 웹툰강좌 비슷하게 캐릭터 수업을 들어봤지만, 선생님
                  강의가 진짜 너무 저에게 딱맞고
                  <b>적절하고 실생활에서 적용도 할수있고</b> 많이 배워서
                  제마음에 들었습니다. 취미로만 해왔거나 관심은 있는데 모르는
                  사람들에게 딱이었습니다. 사람들 <b>능력난이도</b>도
                  제각각이였는데 자세히 꼼꼼히 알려주신게 좋았습니다
                  <b>
                    (특히 아예 모르는사람이 듣기는 최고인거같아요, 강력추천)
                  </b>
                  저는 취미로만 했지 <b>클립스튜디오 기능</b>은 무긍무진해서
                  자세히 몰랐는데 주로 쓴다던가,
                  <b>한가지 기법에도 여러방법으로</b>도 알려주셔서 좋았습니다
                  그리고 학생들의 <b>수업관심도</b>에도 날카롭게 캐치하여
                  수업재밌게 해주시고 재밌었습니다 학생 부족한 실력에
                  <b>
                    수격려도 많이 해주시고 가능성을 열게해주시는것도 좋았습니다.
                  </b>
                  독학으로만으로도 한계가 있었는데 그걸 배워서 제일 좋았고
                  <b>
                    장비기능 (타블렛쓰는법,클립스튜디오 프로그램쓰는법 등)
                    배울사람, 웹툰을 어떻게 시작해야하나, 그림을 그리려면 구도가
                    어떤가, 배경을 그릴때도 어떻게 하는가 등등
                  </b>
                  다방면으로 골고루 알려주신것도 좋았습니다 개인적으로 이 강사님
                  하는수업은 다듣고싶어요 짦은 수강기간이였지만 많은것을 배울수
                  있었고 수강기간동안에
                  <b>나만의 캐릭터를 디자인하고 웹툰 콘티를 짤수있어</b> 참으로
                  즐거웠다. 선생님께서 매우 열정적이라서 너무 좋았다
                </p>
              </div>
            </div>
            <div className="flex flex-col py-6 lg:flex-row even:lg:flex-row-reverse">
              <div className="flex mx-auto mb-5 w-[15rem] h-[15rem] lg:mx-8 lg:w-[21rem] lg:h-[21rem]">
                <figure className="w-full h-full p-3 overflow-hidden rounded-full bg-sky-700">
                  <img
                    src="/src/detail/user_m.webp"
                    alt="이○○의 포트폴리오"
                    loading="lazy"
                    width="100%"
                  />
                </figure>
              </div>
              <div className="relative flex-1 p-6 bg-white rounded-lg lg:p-10 lg:ml-12 even:lg:mr-12">
                <h5 className="text-2xl font-bold text-left">
                  <span className="block text-base text-primary">
                    <b className="text-zinc-600">웹툰 캐릭터반</b> 수강생
                  </span>
                  이○○
                </h5>
                <div className="flex flex-col mt-3 text-3xl font-bold items-left">
                  <p>
                    <span className="text-primary">4.8</span> / 5
                  </p>
                  <span
                    style={{ width: `${1.45 * 4.8}rem` }}
                    className="h-[1.2rem] display star_bg"
                  ></span>
                </div>
                <p className="relative text-base py-6 px-6 mt-16 bg-[#f2f3f5] border-t-2 border-t-white border-l-2 border-l-[#f2f3f5] after:w-12 after:h-12 after:border-l-[3rem] after:border-r-[#f2f3f5] after:border-[3rem] after:border-[transparent] after:absolute after:top-[-3rem] after:right-[-0.1rem]">
                  <b>인체 비율 등 기본기</b>를 배우고 싶었는데 도움이 많이
                  되었습니다 완전 쌩 초보라서 걱정했는데 강사 선생님이
                  <b>꼼꼼하게 기초부처 설명</b> 해주셔서 도움 많이 되었습니다.
                  <br />
                  강의 내용이 매우 유익하면서 재미있었습니다.
                  <b>강의를 체계적으로</b>
                  진행하면서도 수강생들의 자유도가 높기 때문에, 배운 내용을
                  토대로 곧장 <b>원하는 작업을 할 수 있는 환경이 조성</b>
                  되어있습니다. 자신의 실력을 빠르게 시험하면서 갈고 닦고 싶다면
                  강력하게 추천드립니다. <br />
                  선생님께서 꼼꼼하게 알려주려고 하시고 모르는 부분 다시
                  여쭤보면 친절하게 답변해주십니다!
                  <b>웹툰에 처음 입문하려는 분들</b>이 들으시면 매우 좋은
                  강의입니다! 가르쳐주시느라 고생 많으셨습니다!
                </p>
              </div>
            </div>
            <div className="flex flex-col py-6 lg:flex-row even:lg:flex-row-reverse">
              <div className="flex mx-auto mb-5 w-[15rem] h-[15rem] lg:mx-8 lg:w-[21rem] lg:h-[21rem]">
                <figure className="w-full h-full p-3 overflow-hidden bg-purple-800 rounded-full">
                  <img
                    src="/src/detail/user_m.webp"
                    alt="최○○의 포트폴리오"
                    loading="lazy"
                    width="100%"
                  />
                </figure>
              </div>
              <div className="relative flex-1 p-6 bg-white rounded-lg lg:p-10 lg:ml-12 even:lg:mr-12">
                <h5 className="text-2xl font-bold text-right">
                  <span className="block text-base text-primary">
                    <b className="text-zinc-600">웹툰 캐릭터반</b> 수강생
                  </span>
                  최○○
                </h5>
                <div className="flex flex-col mt-3 text-3xl font-bold items-left even:items-end">
                  <p>
                    <span className="text-primary">4.4</span> / 5
                  </p>
                  <span
                    style={{ width: `${1.45 * 4.4}rem` }}
                    className="h-[1.2rem] display star_bg"
                  ></span>
                </div>
                <p className="relative text-base py-6 px-6 mt-16 bg-[#f2f3f5] border-t-2 border-t-white border-l-2 border-l-[#f2f3f5] after:w-12 after:h-12 after:border-l-[3rem] after:border-l-[#f2f3f5] after:border-[3rem] after:border-[transparent] after:absolute after:top-[-3rem] after:left-[-0.1rem]">
                  기본기가 부족하시다면 들으면서 엄청 도움될거에요. 포토샵을
                  중급, <b>클립스튜디오</b> 사용경험 없는 상태에서
                  클립스튜디오를 배우기 위해 수강을 들었습니다. 초반 툴설명이후
                  수업이 포토샵 위주로 진행된건 아쉬웠으나, 포토샵에서 몰랐던
                  새로운 기능들도 알게되었습니다. 다음 수업때는 클립스튜디오
                  비중을 조금 더 늘려주셔도 좋을 것 같습니다. 강사님의 열정
                  성실성은 모두 만족스러워 같은 강사님의 다음 수업도 신청합니다.
                  웹툰을 시작하고 싶지만 아무지식도 없어서 망설이다가 수업을
                  신청하게 되었습니다. <b>비전공자</b>로서 새로운 지식을
                  알게돼서 도움이 많이 되었습니다. 또한 선생님께서 한 명의
                  낙오자도 없도록 친절하게 신경써주셔서 그림 그리는 내내
                  즐거웠습니다.
                </p>
              </div>
            </div>
            <div className="flex flex-col py-6 lg:flex-row even:lg:flex-row-reverse">
              <div className="flex mx-auto mb-5 w-[15rem] h-[15rem] lg:mx-8 lg:w-[21rem] lg:h-[21rem]">
                <figure className="w-full h-full p-3 overflow-hidden bg-indigo-500 rounded-full">
                  <img
                    src="/src/detail/user_w.webp"
                    alt="이○○의 포트폴리오"
                    loading="lazy"
                    width="100%"
                  />
                </figure>
              </div>
              <div className="relative flex-1 p-6 bg-white rounded-lg lg:p-10 lg:ml-12 even:lg:mr-12">
                <h5 className="text-2xl font-bold text-left">
                  <span className="block text-base text-primary">
                    <b className="text-zinc-600">웹툰 캐릭터반</b> 수강생
                  </span>
                  양○○
                </h5>
                <div className="flex flex-col mt-3 text-3xl font-bold items-left">
                  <p>
                    <span className="text-primary">4.8</span> / 5
                  </p>
                  <span
                    style={{ width: `${1.45 * 4.8}rem` }}
                    className="h-[1.2rem] display star_bg"
                  ></span>
                </div>
                <p className="relative text-base py-6 px-6 mt-16 bg-[#f2f3f5] border-t-2 border-t-white border-l-2 border-l-[#f2f3f5] after:w-12 after:h-12 after:border-l-[3rem] after:border-r-[#f2f3f5] after:border-[3rem] after:border-[transparent] after:absolute after:top-[-3rem] after:right-[-0.1rem]">
                  <b>인체 비율 등 기본기</b>를 배우고 싶었는데 도움이 많이
                  되었습니다 완전 쌩 초보라서 걱정했는데 강사 선생님이{' '}
                  <b>꼼꼼하게 기초부처 설명</b> 해주셔서 도움 많이 되었습니다.
                  <br />
                  강의 내용이 매우 유익하면서 재미있었습니다.{' '}
                  <b>강의를 체계적으로</b>
                  진행하면서도 수강생들의 자유도가 높기 때문에, 배운 내용을
                  토대로 곧장 <b>원하는 작업을 할 수 있는 환경이 조성</b>
                  되어있습니다. 자신의 실력을 빠르게 시험하면서 갈고 닦고 싶다면
                  강력하게 추천드립니다. <br />
                  선생님께서 꼼꼼하게 알려주려고 하시고 모르는 부분 다시
                  여쭤보면 친절하게 답변해주십니다!
                  <b>웹툰에 처음 입문하려는 분들</b>이 들으시면 매우 좋은
                  강의입니다! 가르쳐주시느라 고생 많으셨습니다!
                </p>
              </div>
            </div>
          </div>
        </div>
        <ReviewSlide reviewList={list} />
      </section>
      <section className="py-16 bg-white">
        <div className="wrap">
          <h4 className="text-2xl font-bold">커리큘럼을 확인하세요.</h4>
          <p className="mt-3 text-base">
            입학상담을 통해 나의 실력에 맞는 진도를 상담하실 수 있습니다.
            <br />
            지금 나의 실력을 체크하고 꿈에 한발 더 다가가세요!
          </p>
          <ul className="mt-10">
            <li>
              <p className="inline-block text-black border-2 border-[#F28705] font-bold bg-[#F28705] text-base rounded-lg px-2 py-1 mb-5">
                Part1. 오리엔테이션
              </p>
              <div className="grid gap-3 md:grid-cols-1 lg:grid-cols-2">
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 1"
                    title="01. 오리엔테이션"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        강의 및 강사 소개
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 2"
                    title="02. 웹툰의 이해"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        하드웨어 및 소프트웨어 이해 (tablet, Cintiq, CLIP
                        STUDIO, Photoshop 등)
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        웹툰제작 시 사용되는 툴의 환경설정 및 실습(클립스튜디오,
                        포토샵)
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
              </div>
            </li>
            <li className="mt-10">
              <p className="inline-block text-black border-2 border-[#F28705] font-bold bg-[#F28705] text-base rounded-lg px-2 py-1 mb-5">
                Part2. 웹툰 캐릭터 제작
              </p>
              <div className="grid gap-3 md:grid-cols-1 lg:grid-cols-2">
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 3"
                    title="01. 인체 드로잉의 이해 및 실습"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        기초 인체드로잉
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        크로키, 모작 등 다양한 방법을 통한 인체 익히기
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 4"
                    title="02. 펜선 및 채색"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        클립스튜디오 툴을 활용한 펜선 실습
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        기본채색 및 명암 활용법 등 실습
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 5"
                    title="03. 원고의 이해 및 실습 Part.1"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        글콘디 및 콘치, 러프스케치, 펜선 및 채식, 원고 과정의
                        이해 및 실습
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        웹툰캐릭터 제작
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
              </div>
            </li>
            <li className="mt-10">
              <p className="inline-block text-black border-2 border-[#F28705] font-bold bg-[#F28705] text-base rounded-lg px-2 py-1 mb-5">
                Part3. 4컷 웹툰 제작
              </p>
              <div className="grid gap-3 md:grid-cols-1 lg:grid-cols-2">
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 6"
                    title="01. 캐릭터 및 인체 연구"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        내가 원하는 캐릭터 만들기
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        캐릭터에 맞는 인체 연습
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 7"
                    title="02. 내가 원하는 캐릭터 완성"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        캐릭터 펜선 및 채색
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        흉상, 반신상, 전신 완성하기
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 8"
                    title="03. 배경의 이해와 실습"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        투시법(기본 1,2,3점 투시, 투시별 연출 및 활용 방법)
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        스케치업을 활용한 배경 제작 및 3D 이질감 보정
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 9"
                    title="04. 원고의 이해 및 실습 Part.2"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        글콘디 및 콘치, 러프스케치, 펜선 및 채식, 원고 과정의
                        이해 및 실습
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        4컷 웹툰 완성
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
              </div>
            </li>
            <li className="mt-10">
              <p className="inline-block text-black border-2 border-[#F28705] font-bold bg-[#F28705] text-base rounded-lg px-2 py-1 mb-5">
                Part4. 웹툰 프롤로그 완성
              </p>
              <div className="grid gap-3 md:grid-cols-1 lg:grid-cols-2">
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 10"
                    title="01. 스토리 작법"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        다양한 장르의 스토리와 스토리의 전개방식에 대한 이해
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        재미있는 소재를 만드는 6가지 방법
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        사건의 중심이 되는 3명의 캐릭터 설정
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 11"
                    title="02. 연출 이론"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        연출에 대한 기초 이론(샷과 앵글을 통한 연출, 각도와
                        대조의 연출, 컷에 대한 이해)
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        다양한 장르의 연출 (ex. 일상, 판타지, 스릴러 등 장르에
                        따른 다양한 연출 연구)
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 12"
                    title="03. 연출의 이론 및 실습"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        인물의 성격, 감정표현 등에 따른 연출 활용
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        배경, 채색의 연출 활용(긴장감, 추격패턴, 혼란, 시선의
                        흐름으로 컷의 연결 및 전조)
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 12"
                    title="04. 원고의 이해 및 실습 Part.3"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        글콘디 및 콘치, 러프스케치, 펜선 및 채식, 원고 과정의
                        이해 및 실습
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        프롤로그 완성
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
              </div>
            </li>
            <li className="mt-10">
              <p className="inline-block text-black border-2 border-[#F28705] font-bold bg-[#F28705] text-base rounded-lg px-2 py-1 mb-5">
                Part5. Portfolio
              </p>
              <div className="grid gap-3 md:grid-cols-1 lg:grid-cols-2">
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 13"
                    title="01. 단편 웹툰 제작"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        시놉시스 작성
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        캐릭터 시트 그리기
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        글, 그림 콘티 작성
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        단편 원고 작업, 편집
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        작가 데뷔 및 취업을 위한 포트폴리오 제작
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
              </div>
            </li>
          </ul>
          <p className="mt-10 text-base">
            * 수업일정과 소요되는 시간, 진도진행 방식 등 학생들의 레벨에
            기반하여 조금씩 변경 될 수 있습니다
          </p>
        </div>
      </section>
      <section className="py-16 bg-[#0D0D0D]">
        <Portfolio />
      </section>
      <section id="consult" className="py-20">
        <Form />
      </section>
      <DetailFixed />
    </>
  )
}
