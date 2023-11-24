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
      <section className="bg-white">
        <div className="text-center wrap">
          <p className="pt-20 text-center text-black">
            <span className="inline-block text-black border-2 border-[#F26E22] bg-[#F26E22] rounded-lg text-center text-xl font-bold px-2 py-1">
              이모티콘 제작
            </span>
            <br />
            <b className="inline-block mt-5 text-4xl/[3rem]">
              생동감 있는 감정표현으로
              <br />
              5주 만의 이모티콘 크리에이터 되기
            </b>
          </p>
          <figure className="w-full mx-auto mt-10">
            <img src="/src/detail/d3_main_section.webp" />
          </figure>
        </div>
      </section>
      {/* <section className="py-16 bg-black">
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
      </section> */}
      <section className="py-16">
        <div className="wrap">
          <div className="flex flex-wrap justify-between pb-10 border-b-1">
            <p className="w-full mb-5 lg:w-1/2">
              <b className="text-3xl">추천 대상.</b>
            </p>
            <ul className="text-base lg:w-1/2 md:w-full">
              <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                자유로운 시간을 활용해 본업에 지장 없이, 자본금 없이 부수입을
                생각하고 계신 분
              </li>
              <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                이모티콘 제작에 대해 기초부터 이모티콘샵의 승인까지 제대로
                배워보고 싶은 분
              </li>
              <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                아이디어는 있는데 어떻게 표현해야 하는지 방법을 몰라 고민이신 분
              </li>
              <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                그림을 못 그려도, 나만의 개성있는 이모티콘을 만들어 보고 싶은 분
              </li>
              <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                이모티콘 제작에 관심은 있으나 혼자 학습하기에는 부담이 되시는 분
              </li>
            </ul>
          </div>
          <div className="flex flex-wrap justify-between py-10 border-b-1">
            <p className="w-full mb-5 lg:w-1/2">
              <b className="text-3xl">수업 환경.</b>
            </p>
            <div className="w-full text-base text-center lg:w-1/2">
              <figure className="w-[70%] mx-auto mb-10 ">
                <img src="/src/detail/d3_img_info.webp" width="100%" />
              </figure>
              Wacom Tablet & Adobe Photoshop
            </div>
          </div>
        </div>
      </section>
      <section className="pb-16 bg-white">
        <div className="wrap">
          <div className="text-center">
            <p className="inline-block px-4 py-2 mb-5 text-sm font-bold text-center text-black border-2 rounded-lg bg-[#F26E22] border-[#F26E22]">
              Flowchart
            </p>
            <h4 className="text-center text-black">
              <span className="text-2xl">그림을 못 그리는 사람도</span>
              <br />
              <b className="mt-4 text-2xl">
                5주 만에 이모티콘 크리에이터에 도전할 수 있는 커리큘럼!
              </b>
            </h4>
            <ul className="mx-auto mt-10 lg:w-full xl:w-4/5">
              <li className="relative p-6 mb-20 text-left text-[#021226] border-2 border-[#71717a] rounded-lg">
                <span className="absolute bottom-[-5rem] text-[#F26E22] left-[50%] text-6xl ml-[-1.5rem]">
                  <i className="xi-angle-down" />
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 01. 이모티콘 제작의 이해
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    하드웨어 및 소프트웨어의 이해 (Tablet, Photoshop)
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    동시 작업을 위한 기초 작업과정 이해
                  </li>
                  <li className="relative pt-5 pl-4 mt-5 border-[#71717a] border-t-1">
                    이모티콘 제작에 사용되는 Tablet과 Photoshop을 사용하기 위한
                    환경설정과 활용예시 등을 통해 사용법을 익히고 여러 감정을
                    표현하고 있는 캐릭터들을 동시에 관리하고 검토하며 작업하기
                    위한 기초 작업 틀을 구축합니다.
                  </li>
                </ul>
              </li>
              <li className="relative p-6 mb-20 text-left text-[#021226] border-2 border-[#71717a] rounded-lg">
                <span className="absolute bottom-[-5rem] text-[#F26E22] left-[50%] text-6xl ml-[-1.5rem]">
                  <i className="xi-angle-down" />
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 02. 이모티콘 제작 기획
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    이모티콘샵의 시장조사
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    표절과 창작의 이해
                  </li>
                  <li className="relative pt-5 pl-4 mt-5 border-[#71717a] border-t-1">
                    이모티콘샵의 시장조사를 통해 시장 트렌드를 이해하여 잘
                    팔리고 인기 있는 이모티콘을 제작하기 위한 방향을 설정할 수
                    있고, 표절과 창작의 차이를 이해함으로써 나만의 이모티콘을
                    기획할 수 있습니다.
                  </li>
                </ul>
              </li>
              <li className="relative p-6 mb-20 text-left text-[#021226] border-2 border-[#71717a] rounded-lg">
                <span className="absolute bottom-[-5rem] text-[#F26E22] left-[50%] text-6xl ml-[-1.5rem]">
                  <i className="xi-angle-down" />
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 03. 이모티콘 캐릭터 제작
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    스케치 클린업 및 채색
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    Phtoshop action을 활용한 빠르고 깔끔한 채색
                  </li>
                  <li className="relative pt-5 pl-4 mt-5 border-[#71717a] border-t-1">
                    기초 스케치와 깔끔하게 따는 클린업 작업의 개념을 이해하며
                    드로잉을 실습할 수 있고, Photoshop의 로봇기능이라 불리는
                    'action'을 활용하여 빠르고 정확하게 채색하는 방법을 배워
                    이모티콘 캐릭터를 제작할 수 있습니다.
                  </li>
                </ul>
              </li>
              <li className="relative p-6 mb-20 text-left text-[#021226] border-2 border-[#71717a] rounded-lg">
                <span className="absolute bottom-[-5rem] text-[#F26E22] left-[50%] text-6xl ml-[-1.5rem]">
                  <i className="xi-angle-down" />
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 04. 식자 및 감정 표현
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    다양한 폰트를 활용한 텍스트 표현
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    다양한 감정 표현과 이펙트 효과
                  </li>
                  <li className="relative pt-5 pl-4 mt-5 border-[#71717a] border-t-1">
                    무료로 사용할 수 있는 다양한 폰트를 활용하여 텍스트를 표현할
                    수 있는 방법과 캐릭터들에 생동감을 실어줄 수 있도록 상황에
                    맞는 감정표현방법, 이를 극대화 할 수 있는 이펙트 효과를
                    학습해 캐릭터의 감정표현을 극대화 할 수 있습니다.
                  </li>
                </ul>
              </li>
              <li className="relative p-6 mb-20 text-left text-[#021226] border-2 border-[#71717a] rounded-lg">
                <span className="absolute bottom-[-5rem] text-[#F26E22] left-[50%] text-6xl ml-[-1.5rem]">
                  <i className="xi-angle-down" />
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 05. 시뮬레이터를 통한 세부 보정
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    슬라이스로 이모티콘 분할 및 출력
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    이모티콘 스튜디오에 올려 보정 및 확인
                  </li>
                  <li className="relative pt-5 pl-4 mt-5 border-[#71717a] border-t-1">
                    완성된 작업 틀에서 각각의 이모티콘들을 분리해 출력하고
                    이모티콘 뷰어(시뮬레이터)를 통해 이미지와 폰트의 사이즈, 선
                    굵기, 가독성 등을 조절하고 마지막으로 카카오 이모티콘
                    스튜디오를 통해 확인하는 절차들을 학습할 수 있습니다.
                  </li>
                </ul>
              </li>
              <li className="relative p-6 mb-20 text-left text-[#021226] border-2 border-[#71717a] rounded-lg">
                <span className="absolute bottom-[-5rem] text-[#F26E22] left-[50%] text-6xl ml-[-1.5rem]">
                  <i className="xi-angle-down" />
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 06. 1:1 개인 피드백 통해 멈춰있는 이모티콘 완성
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    기획, 스케치, 클린업, 채색, 식자, 효과, 세부보정 단계 개별
                    실습
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    1:1 개인 피드백을 통해 각자의 개성 있는 이모티콘 완성
                  </li>
                  <li className="relative pt-5 pl-4 mt-5 border-[#71717a] border-t-1">
                    앞서 배운 내용을 기반으로 내가 직접 이모티콘을 제작합니다.
                    보통 3셋트 이상의 이모티콘을 제작해 볼 수 있으며, 1:1
                    개인피드백을 통해 강사님의 도움 없이 점차적으로 완성된
                    이모티콘을 만들어 갈 수 있게 됩니다.
                  </li>
                </ul>
              </li>
              <li className="relative p-6 mb-20 text-left text-[#021226] border-2 border-[#71717a] rounded-lg">
                <span className="absolute bottom-[-5rem] text-[#F26E22] left-[50%] text-6xl ml-[-1.5rem]">
                  <i className="xi-angle-down" />
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 07. 애니메이션의 원리 이해
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    디즈니에서 애니메이터들에게 강조하는 애니메이션 원칙
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    간단한 애니메이션 실습(로켓발사)
                  </li>
                  <li className="relative pt-5 pl-4 mt-5 border-[#71717a] border-t-1">
                    애니메이션의 원리를 이해할 수 있으며 특히, 디즈니에서
                    애니메이터들에 강조하는 애니메이션 원칙을 학습할 수 있으며
                    이를 응용해 재미있고 맛깔나는 애니메이션을 만들어 볼 수
                    있습니다.
                  </li>
                </ul>
              </li>
              <li className="relative p-6 mb-20 text-left text-[#021226] border-2 border-[#71717a] rounded-lg">
                <span className="absolute bottom-[-5rem] text-[#F26E22] left-[50%] text-6xl ml-[-1.5rem]">
                  <i className="xi-angle-down" />
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 08. 경제적인 애니메이션?
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    경제적인 애니메이션이란 무엇인가?
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    펄쩍펄쩍 뛰는 캐릭터 제작
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    가속도 개념과 역가속도 개념에 대한 이해
                  </li>
                  <li className="relative pt-5 pl-4 mt-5 border-[#71717a] border-t-1">
                    미국의 ‘디즈니’, 일본의 ‘가이낙스’ 두 회사의 애니메이션
                    스타일을 예시로 생동감 있으면서도 효율적인, 힘의 분산을 잘
                    하는 '경제적인' 애니메이션에 대해 학습할 수 있습니다.
                  </li>
                </ul>
              </li>
              <li className="relative p-6 mb-20 text-left text-[#021226] border-2 border-[#71717a] rounded-lg">
                <span className="absolute bottom-[-5rem] text-[#F26E22] left-[50%] text-6xl ml-[-1.5rem]">
                  <i className="xi-angle-down" />
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 09. 효율적인 애니메이션
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    Photoshop의 puppet warp 기능 활용
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    Photoshop filter를 활용한 강렬한 속도감
                  </li>
                  <li className="relative pt-5 pl-4 mt-5 border-[#71717a] border-t-1">
                    경제적이고 효율적인 작업을 위해 Photoshop의 puppet
                    warp기능을 활용하여 부드러운 애니메이션을 만들어보고,
                    Photoshop의 속도감을 내는 필터를 통해 더욱 더 강렬한
                    속도감을 표현할 수 있는 방법을 학습할 수 있습니다.
                  </li>
                </ul>
              </li>
              <li className="relative p-6 mb-20 text-left text-[#021226] border-2 border-[#71717a] rounded-lg">
                <span className="absolute bottom-[-5rem] text-[#F26E22] left-[50%] text-6xl ml-[-1.5rem]">
                  <i className="xi-angle-down" />
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 10. GifCam을 활용한 애니메이션
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    동영상을 캡처하여 참고자료를 만들기
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    참고자료를 트레이싱 또는 참고하여 애니메이션 만들기
                  </li>
                  <li className="relative pt-5 pl-4 mt-5 border-[#71717a] border-t-1">
                    GifCam을 활용해 동영상을 캡쳐하여 gif 파일을 만들고, 그
                    파일을 참조하여 애니메이션을 재현하고 로토스코핑기법을
                    활용한 애니메이션 기법을 학습할 수 있습니다.
                  </li>
                </ul>
              </li>
              <li className="relative p-6 mb-20 text-left text-[#021226] border-2 border-[#71717a] rounded-lg">
                <span className="absolute bottom-[-5rem] text-[#F26E22] left-[50%] text-6xl ml-[-1.5rem]">
                  <i className="xi-angle-down" />
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 11. 움직이는 이모티콘 완성
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    각자의 개성 있는 이모티콘에 애니메이션 적용
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    1:1 개인 피드백을 통해 움직이는 이모티콘 완성
                  </li>
                  <li className="relative pt-5 pl-4 mt-5 border-[#71717a] border-t-1">
                    각자 완성된 멈춰있는 이모티콘에 애니메이션을 적용하여
                    감정표현을 극대화 해 생동감 있게 움직이는 이모티콘을 만들 수
                    있으며, 1:1 개인피드백을 통해 강사님의 도움 없이 점차적으로
                    움직이는 이모티콘을 완성해 갈 수 있게 됩니다.
                  </li>
                </ul>
              </li>
              <li className="mt-10 p-6 text-left text-[#021226] border-2 border-[#F26E22] rounded-lg bg-[#F26E22]">
                <span className="text-[#F26E22] border-2 border-[#021226] bg-[#021226] text-center text-xl py-1 px-4 inline-block mb-2">
                  Final
                </span>
                <h5 className="relative text-xl font-semibold pl-4 after:content-['|'] after:absolute after:left-[0.2rem] after:top-[-0.05rem]">
                  Step 12. 이모티콘 크리에이터가 되기 위한 노하우
                </h5>
                <ul className="mt-3 text-base">
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    여러 플랫폼에 이식해보기
                  </li>
                  <li className="relative mt-1 pl-4 after:content-['∙'] after:absolute after:left-0 after:top-[-0.05rem]">
                    크리에이터 등록 및 이모티콘 제안
                  </li>
                  <li className="relative pt-5 pl-4 mt-5 border-[#71717a] border-t-1">
                    카카오톡, 라인, 오지큐, 모히톡 등 플랫폼마다 파일크기와
                    비율이 다르기 때문에 플랫폼별 특징을 이해하고 형식에 맞춰
                    이식하는 방법을 체험하고 이모티콘 승인을 위한 포인트 및
                    노하우를 배울 수 있습니다
                  </li>
                </ul>
              </li>
            </ul>
            <p className="mt-10 text text-[#021226] text-base">
              * 수업일정과 소요되는 시간, 진도진행 방식 등 학생들의 평균적인
              레벨에 기반하여 조금씩 변경 될 수 있습니다.
            </p>
          </div>
        </div>
      </section>
      {/* <section className="py-16 bg-[#F2F2F2]">
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
      </section> */}
      <section className="pb-16 bg-white">
        <div className="wrap">
          <h4 className="text-2xl font-bold">커리큘럼을 확인하세요.</h4>
          <p className="mt-3 text-base">
            아래의 모든 챕터 클립들을 5주만에 완성할 수 있습니다.
            <br />
            지금 등록하시고 이모티콘 크리에이터가 되어보세요!
          </p>
          <ul className="mt-10">
            <li>
              <p className="inline-block text-black border-2 border-[#F26E22] font-bold bg-[#F26E22] text-base rounded-lg px-2 py-1 mb-5">
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
                    title="02. 이모티콘 제작의 이해"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        하드웨어 및 소프트웨어의 이해(Tablet, Photoshop)
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        동시 작업을 위한 기초 작업과정 이해
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
              </div>
            </li>
            <li className="mt-10">
              <p className="inline-block text-black border-2 border-[#F26E22] font-bold bg-[#F26E22] text-base rounded-lg px-2 py-1 mb-5">
                Part2. 멈춰있는 이모티콘 만들기
              </p>
              <div className="grid gap-3 md:grid-cols-1 lg:grid-cols-2">
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 3"
                    title="01. 이모티콘 제작 기획"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        이모티콘샵의 시장조사
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        표절과 창작의 이해
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 4"
                    title="02. 이모티콘 캐릭터 제작"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        스케치 클린업 및 채색
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        Phtoshop action을 활용한 빠르고 깔끔한 채색
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 5"
                    title="03. 식자 및 감정 표현"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        다양한 폰트를 활용한 텍스트 표현
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        다양한 감정 표현과 이펙트 효과
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 6"
                    title="04. 시뮬레이터를 통한 세부 보정"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        슬라이스로 이모티콘 분할 및 출력
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        이모티콘 스튜디오에 올려 보정 및 확인
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 7"
                    title="05. 1:1 개인 피드백을 통해 멈춰있는 이모티콘 완성"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        기획, 스케치, 클린업, 채색, 식자, 효과, 세부보정 단계
                        개별 실습
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        1:1 개인 피드백을 통해 각자의 개성 있는 이모티콘 완성
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
              </div>
            </li>
            <li className="mt-10">
              <p className="inline-block text-black border-2 border-[#F26E22] font-bold bg-[#F26E22] text-base rounded-lg px-2 py-1 mb-5">
                Part3. 움직이는 이모티콘 만들기
              </p>
              <div className="grid gap-3 md:grid-cols-1 lg:grid-cols-2">
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 8"
                    title="01. 애니메이션의 원리 이해"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        디즈니에서 애니메이터들에게 강조하는 애니메이션 원칙
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        간단한 애니메이션 실습(로켓발사)
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 9"
                    title="02. 경제적인 애니메이션?"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        경제적인 애니메이션이란 무엇인가?
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        펄쩍펄쩍 뛰는 캐릭터 제작
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        가속도 개념과 역가속도 개념에 대한 이해
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 10"
                    title="03. 효율적인 애니메이션"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        Photoshop의 puppet warp 기능 활용
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        Photoshop filter를 활용한 강렬한 속도감
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 11"
                    title="04. GifCam을 활용한 애니메이션"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        동영상을 캡처하여 참고자료를 만들기
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        참고자료를 트레이싱 또는 참고하여 애니메이션 만들기
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 12"
                    title=" 05. 움직이는 이모티콘 완성"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        각자의 개성 있는 이모티콘에 애니메이션 적용
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        1:1 개인 피드백을 통해 움직이는 이모티콘 완성
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
              </div>
            </li>
            <li className="mt-10">
              <p className="inline-block text-black border-2 border-[#F26E22] font-bold bg-[#F26E22] text-base rounded-lg px-2 py-1 mb-5">
                Part5. 이모티콘 크리에이터 도전
              </p>
              <div className="grid gap-3 md:grid-cols-1 lg:grid-cols-2">
                <Accordion variant="splitted" className="px-0 font-bold">
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 13"
                    title="01. 이모티콘 크리에이터가 되기 위한 노하우"
                  >
                    <ul className="py-3 border-t-1">
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        여러 플랫폼에 이식해보기
                      </li>
                      <li className="relative mt-2 text-base font-normal after:content-['・'] after:absolute after:top-[0.1rem] after:left-0 pl-[1rem]">
                        크리에이터 등록 및 이모티콘 제안
                      </li>
                    </ul>
                  </AccordionItem>
                </Accordion>
              </div>
            </li>
          </ul>
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
